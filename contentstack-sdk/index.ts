import * as Utils from "@contentstack/utils";
import { algoliasearch } from "algoliasearch";
import ContentstackLivePreview from "@contentstack/live-preview-utils";
import getConfig from "next/config";
import striptags from "striptags";
import {
  customHostUrl,
  initializeContentStackSdk,
  isValidCustomHostUrl,
} from "./utils";
import axios from "axios";

type GetEntry = {
  contentTypeUid: string;
  referenceFieldPath: string[] | undefined;
  jsonRtePath: string[] | undefined;
  locale?: string;
  siteName?: string;
};

type GetEntryByUrl = {
  entryUrl: string | undefined;
  contentTypeUid: string;
  referenceFieldPath: string[] | undefined;
  locale?: string;
  siteName?: string; // Site name for multi-site support
  // jsonRtePath: string[] | undefined;
};

const { publicRuntimeConfig } = getConfig();
const envConfig = process.env.CONTENTSTACK_API_KEY
  ? process.env
  : publicRuntimeConfig;

let customHostBaseUrl = envConfig.CONTENTSTACK_API_HOST as string;
customHostBaseUrl = customHostBaseUrl ? customHostUrl(customHostBaseUrl) : "";

// SDK initialization
const Stack = initializeContentStackSdk();

// set host url only for custom host or non prod base url's
if (customHostBaseUrl && isValidCustomHostUrl(customHostBaseUrl)) {
  Stack.setHost(customHostBaseUrl);
}

// Setting LP if enabled
ContentstackLivePreview.init({
  //@ts-ignore
  stackSdk: Stack,
  clientUrlParams: {
    host: envConfig.CONTENTSTACK_APP_HOST,
  },
  ssr: false,
})?.catch((err) => console.error(err));

export const { onEntryChange } = ContentstackLivePreview;

const renderOption = {
  span: (node: any, next: any) => next(node.children),
};
export default {
  /**
   *
   * fetches all the entries from specific content-type
   * @param {* content-type uid} contentTypeUid
   * @param {* reference field name} referenceFieldPath
   * @param {* Json RTE path} jsonRtePath
   *
   */

  // Utility to get reference fields from content type schema  

  getEntry({ contentTypeUid, referenceFieldPath, jsonRtePath,locale,siteName }: GetEntry) {
    return new Promise((resolve, reject) => {
      const query = Stack.ContentType(contentTypeUid).Query();
      if (referenceFieldPath) query.includeReference(referenceFieldPath);
      query
        .toJSON()
        .find()
        .then(
          (result) => {
            jsonRtePath &&
              Utils.jsonToHTML({
                entry: result,
                paths: jsonRtePath,
                renderOption,
              });
            resolve(result);
          },
          (error) => {
            reject(error);
          }
        );
    });
  },

  /**
   *fetches specific entry from a content-type
   *
   * @param {* content-type uid} contentTypeUid
   * @param {* url for entry to be fetched} entryUrl
   * @param {* reference field name} referenceFieldPath
   * @param {* Json RTE path} jsonRtePath
   * @returns
   */
  getEntryByUrl({
    contentTypeUid,
    entryUrl,
    referenceFieldPath,
    locale = "en-us",
    siteName = "Site-1"
  }: // jsonRTEPath,
  GetEntryByUrl) {
    return new Promise((resolve, reject) => {
      const blogQuery = Stack.ContentType(contentTypeUid)
        .Query()
        .language(locale.toLowerCase() || "en-us");
      if (referenceFieldPath) blogQuery.includeReference(referenceFieldPath);
      blogQuery.toJSON();
      
      const data = blogQuery.where("url", `${entryUrl}`).where("site_configuration.site_section", `${siteName}`).find();
      data.then(
        (result) => {
          // jsonRtePath &&
          //   Utils.jsonToHTML({
          //     entry: result,
          //     paths: jsonRtePath,
          //     renderOption,
          //   });

        
          resolve(result[0]);
        },
        (error) => {
          console.error(error);
          reject(error);
        }
      );
    });
  },
};

export async function getEntryByUid(
  contentTypeUid,
  entryUid,
  locales?: string
) {
  try {
    const entry = await Stack.ContentType(contentTypeUid)
      .Entry(entryUid)
      .language(locales?.toLowerCase() || "en-us")
      .toJSON()
      .fetch();
    return entry;
  } catch (error) {
    console.error(
      `❌ Error fetching entry [${entryUid}] from [${contentTypeUid}]`,
      error
    );
    throw error;
  }
}

export async function executeGraphQLQuery(graphQLQuery) {
  const API_KEY = process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY;
  const DELIVERY_TOKEN = process.env.NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN;
  const ENVIRONMENT = process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT;
  if (!API_KEY || !DELIVERY_TOKEN || !ENVIRONMENT) {
    throw new Error("Missing Contentstack env variables");
  }

  const graphqlEndpoint = `https://graphql.contentstack.com/stacks/${API_KEY}?environment=${ENVIRONMENT}`;

  const query = graphQLQuery;

  try {
    const response = await axios.post(
      graphqlEndpoint,
      { query },
      {
        headers: {
          access_token: DELIVERY_TOKEN,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error(
      "GraphQL fetch failed:",
      error.response?.data || error.message
    );
    throw error;
  }
}

// export async function resolveNestedEntry(entry: any, locales?: string): Promise<any> {
//   async function resolveDeep(obj: any): Promise<any> {
//     if (Array.isArray(obj)) {
//       return Promise.all(obj.map(resolveDeep));
//     }
//     if (obj && typeof obj === "object") {
//       if (obj.uid && obj._content_type_uid) {
//         try {
//           const resolved = await Stack.ContentType(obj._content_type_uid)
//             .Entry(obj.uid).language(locales?.toLowerCase() || "en-us")
//             .toJSON()
//             .fetch();
//           return resolveDeep(resolved);
//         } catch (err) {
//           console.error(
//             `❌ Failed to resolve entry for ${obj._content_type_uid}/${obj.uid}:`,
//             err
//           );
//           return obj;
//         }
//       }
//       const resolvedObj: any = {};
//       for (const key of Object.keys(obj)) {
//         resolvedObj[key] = await resolveDeep(obj[key]);
//       }
//       return resolvedObj;
//     }
//     return obj;
//   }
//   return await resolveDeep(entry);
// }

export async function resolveNestedEntry(
  entry: any,
  locales?: string,
  siteName?: string
): Promise<any> {
  const visited = new Set<string>();
    
  async function resolveDeep(obj: any): Promise<any> {
    if (Array.isArray(obj)) {
      const resolvedItems = await Promise.all(obj.map(resolveDeep));
      // Remove nulls or deleted entries
      return resolvedItems.filter(
        (item) => item && !item.__deleted
      );
    }

    if (obj && typeof obj === "object") {
      if (obj.uid && obj._content_type_uid) {
        const key = `${obj._content_type_uid}:${obj.uid}`;
        if (visited.has(key)) {
          return { ...obj, __circular_ref: true };
        }

        visited.add(key);
        try {
        
          const resolved = await Stack.ContentType(obj._content_type_uid)
            .Entry(obj.uid)
            .language(locales?.toLowerCase() || "en-us")
            .toJSON()
            .fetch();

          return resolveDeep(resolved);
        } catch (err) {
          const error = err as {
            error_code?: number;
            status?: number;
            message?: string;
          };

          if (error?.error_code === 141 || error?.status === 404) {
            // console.warn(
            //   `⚠️ Missing entry: ${obj._content_type_uid}/${obj.uid}. Possibly deleted from Contentstack.`
            // );
            return { __deleted: true };
          } else {
            console.error(
              `❌ Failed to resolve entry for ${obj._content_type_uid}/${obj.uid}:`,
              err
            );
            return obj;
          }
        }
      }

      const resolvedObj: any = {};
      for (const key of Object.keys(obj)) {
        resolvedObj[key] = await resolveDeep(obj[key]);
      }
      return resolvedObj;
    }

    return obj;
  }

  return await resolveDeep(entry);
}


export async function getAllEntriesByContentType(
  contentTypeUid,
  locales?: string
) {
  const Query = Stack.ContentType(contentTypeUid)
    .Query()
    .language(locales?.toLowerCase() || "en-us");
  Query.toJSON().includeCount();
  try {
    const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Site-1";
    const [entries] = await Query.where("global_field.site_section", `${siteName}`).find();  //"global_field":{"site_section":"Site-2"}    
    const resolvedEntries = await Promise.all(
      entries.map((entry) =>
        resolveNestedEntry(entry, locales?.toLowerCase() || "en-us")
      )
    );
    return resolvedEntries;
  } catch (err) {
    console.error("❌ Error fetching entries:", err);
    return [];
  }
}

export async function getLocals() {
  const API_KEY = process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY;
  const DELIVERY_TOKEN = process.env.NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN;
  const ENVIRONMENT = process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT;

  if (!API_KEY || !DELIVERY_TOKEN || !ENVIRONMENT) {
    throw new Error("Missing Contentstack env variables");
  }
  try {
    const response = await fetch("https://cdn.contentstack.io/v3/locales", {
      headers: {
        api_key: API_KEY as string,
        access_token: DELIVERY_TOKEN as string,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch locales: ${response.status}`);
    }

    const data = await response.json();
    return data.locales;
  } catch (error) {
    console.error("Error fetching locales:", error);
    throw new Error("Failed to load locales");
  }
}

export async function getAllContentTypes() {
  try {
    const contentTypes = await Stack.getContentTypes({
      include_global_field_schema: true,
    });
    return contentTypes;
  } catch (error) {
    console.error("Error fetching content types:", error);
    throw error;
  }
}

// import algoliasearch, { SearchClient, SearchIndex } from 'algoliasearch';
// import striptags from 'striptags';

const MAX_RECORD_BYTES = 9.5 * 1024; // stay safely under 10KB hard limit (Build plan). Adjust per plan.

interface EntryLike {
  uid: string;
  locale?: string;
  url?: string;
  title?: string;
  summary?: string;
  introduction?: string;
  shorttitle?: string;
  topic?: string;
  featured_image?: { url?: string } | null;
  tags?: string[] | { uid: string; title?: string }[];
  // plus other raw fields we *won't* index
  [key: string]: any;
}

interface AlgoliaRecord {
  [key: string]: unknown; // Add index signature for compatibility
  objectID: string;
  parentID?: string; // used when chunking
  section?: string; // e.g., 'intro', 'body-1'
  url?: string;
  title?: string;
  description?: string;
  image?: string | null;
  tags?: any;
  created_at?: string;
  updated_at?: string;
  language?: string;
  content_type?: string;
  shorttitle?: string;
  topic?: string;
  content?: string; // chunked text
}

/**
 * Strip HTML, collapse whitespace, and (optionally) truncate by characters.
 */
function cleanText(html: string | undefined, maxChars = 5000): string {
  if (!html) return "";
  const stripped = striptags(html).replace(/\s+/g, " ").trim();
  return stripped.length > maxChars ? stripped.slice(0, maxChars) : stripped;
}

/**
 * Measure Algolia record size the same way you'll send it.
 */
function recordBytes(obj: unknown): number {
  return Buffer.byteLength(JSON.stringify(obj));
}

/**
 * Split long text into as many AlgoliaRecord chunks as needed to stay under size budget.
 * We pack base fields + a slice of text, re‑measuring JSON size each time.
 */
function chunkLongText(
  base: Omit<AlgoliaRecord, "objectID" | "section" | "content"> & {
    objectID: string;
  },
  text: string,
  maxBytes = MAX_RECORD_BYTES
): AlgoliaRecord[] {
  const words = text.split(" ");
  const chunks: AlgoliaRecord[] = [];
  let currentWords: string[] = [];
  let chunkIndex = 0;

  const pushChunk = () => {
    const candidate: AlgoliaRecord = {
      ...base,
      objectID: `${base.objectID}#${chunkIndex}`,
      parentID: base.objectID,
      section: chunkIndex === 0 ? "intro" : `body-${chunkIndex}`,
      content: currentWords.join(" "),
    };
    // Ensure under max (fallback truncate hard if needed)
    let payload = candidate.content!;
    while (
      recordBytes({ ...candidate, content: payload }) > maxBytes &&
      payload.length > 0
    ) {
      payload = payload.slice(0, Math.floor(payload.length * 0.9));
    }
    candidate.content = payload;
    chunks.push(candidate);
    chunkIndex++;
    currentWords = [];
  };

  for (const w of words) {
    currentWords.push(w);
    const candidate: AlgoliaRecord = {
      ...base,
      objectID: `${base.objectID}#${chunkIndex}`,
      parentID: base.objectID,
      section: chunkIndex === 0 ? "intro" : `body-${chunkIndex}`,
      content: currentWords.join(" "),
    };
    if (recordBytes(candidate) > maxBytes) {
      // remove last word from this chunk, push, then start new
      currentWords.pop();
      pushChunk();
      currentWords.push(w); // start new chunk with current word
    }
  }
  if (currentWords.length) pushChunk();
  return chunks;
}

/**
 * Build one or more Algolia records from a CMS entry.
 * If the combined searchable text fits, return a single record.
 * Else split into multiple chunked records.
 */
export function buildAlgoliaRecords(
  entry: EntryLike,
  contentType: string
): AlgoliaRecord[] {
  const language = entry.locale || "en-us";
  const baseID = `${entry.uid}_${language}`;

  const base: Omit<AlgoliaRecord, "objectID" | "section" | "content"> & {
    objectID: string;
  } = {
    objectID: baseID,
    url: entry.url,
    title: entry.title,
    // short snippet
    image:
      contentType === "blog"
      ? entry.featured_image?.url ?? null
      : entry.image?.url ?? null,

    sitename: entry?.site_configuration?.site_section
      ? entry?.site_configuration?.site_section
      : "Site-1",
    tags: Array.isArray(entry.tags)
      ? entry.tags
        .map((t: any) => (typeof t === "string" ? t : t.uid ?? t.title))
        .filter(Boolean)
      : [],
    created_at: entry.created_at,
    updated_at: entry.updated_at,
    language,
    content_type: contentType,
    shorttitle: entry.shorttitle || "",
    topic: entry.topic || "",
    author: entry?.author || "", // assuming author is a field in the entry
  };

  // Full text to search inside (intro + maybe body/html field names you use)
  const fullText = cleanText(
    entry.introduction ||
      entry.body ||
      entry.content ||
      entry.rich_text ||
      entry.description ||
      entry.summary,
    50000 // allow large; we'll chunk later
  );

  const candidateSingle: AlgoliaRecord = { ...base, content: fullText };
  if (recordBytes(candidateSingle) <= MAX_RECORD_BYTES) {
    return [candidateSingle];
  }

  // Too large → chunk
  return chunkLongText(base, fullText, MAX_RECORD_BYTES);
}

/**
 * Index records in Algolia.
 */
export async function indexEntries(entry: EntryLike, contentType: string) {
  try {
    // const client: SearchClient = algoliasearch(
    //   process.env.NEXT_PUBLIC_ALGOLIA_APP_ID as string,
    //   process.env.NEXT_PUBLIC_ALGOLIA_API_KEY as string
    // );
    // const indexName = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME as string;
    // const index: SearchIndex = client.initIndex(indexName);

    const client = algoliasearch(
      process.env.NEXT_PUBLIC_ALGOLIA_APP_ID as string,
      process.env.NEXT_PUBLIC_ALGOLIA_API_KEY as string
    );
    const indexName = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME as string;

    const records = buildAlgoliaRecords(entry, contentType);

    // Log sizes for diagnostics
    records.forEach((r) => {
      const size = recordBytes(r);
      if (size > MAX_RECORD_BYTES) {
        console.warn(
          `Record ${r.objectID} still too large at ${size} bytes after chunking.`
        );
      }
    });

    const response = await client.saveObjects({
      indexName: indexName,
      objects: records,
    });
    //const response = await index.saveObjects(records);
    return response;
  } catch (error) {
    console.error("Error indexing entries:", error);
    throw error;
  }
}

// export async function indexEntries1(entry: any,contenttype: string)
// {
//  try {
//     const algoliaClient = algoliasearch(process.env.NEXT_PUBLIC_ALGOLIA_APP_ID as string, process.env.NEXT_PUBLIC_ALGOLIA_API_KEY as string);
//     const indexName = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME as string;

//     const record = [{
//       objectID: entry.uid + entry.locale,
//       title: entry.title,
//       description: striptags(entry.summary || ''),
//       url: entry.url,
//       image: entry.featured_image ? entry.featured_image.url : null,
//       tags: entry.tags || [],
//       created_at: entry.created_at,
//       updated_at: entry.updated_at,
//       language: entry.locale || 'en-us',
//       content_type: contenttype,
//       introduction: striptags(entry.introduction || ''),
//       shorttitle: entry.shorttitle || '',
//       topic: entry.topic || 'Technology',
//      ...entry, // Include full entry if needed
//     }];

//     const recordSize = Buffer.byteLength(JSON.stringify(record));

//     if(recordSize >10)
//     {
//       // Handle large record sizes
//       console.warn(`Record size exceeds 10KB: ${recordSize} bytes. Consider optimizing the data.`);
//       return 200;
//     }

//     const response = await algoliaClient.saveObjects({ indexName: indexName, objects: record });
//     return response;
//   } catch (error) {
//     console.error('Error indexing entries:', error);
//   }

// }


export async function updateQuery(uid:string) {
  const API_KEY = process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY;
  const DELIVERY_TOKEN = process.env.NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN;
  const ENVIRONMENT = process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT;
  if (!API_KEY || !DELIVERY_TOKEN || !ENVIRONMENT) {
    throw new Error("Missing Contentstack env variables");
  }

const myHeaders = new Headers();
myHeaders.append("api_key", "blta0ff3cef332c7e34");
myHeaders.append("authtoken", "blt99f75bf81cf3cdfd");
myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
  "entry": {    
    "site_configuration": {
      "site_section": "Site-1"
    }
  }
});

  try {
     const requestOptions: RequestInit = {
  method: "PUT",
  headers: myHeaders,
  body: raw,
  redirect: "follow" as RequestRedirect
};

fetch("https://api.contentstack.io/v3/content_types/page/entries/bltf16daa5a6da2f1f6", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
  } catch (error: any) {
    console.error(
      "Avinash GraphQL fetch failed:",
      error.response?.data || error.message
    );
    throw error;
  }
}