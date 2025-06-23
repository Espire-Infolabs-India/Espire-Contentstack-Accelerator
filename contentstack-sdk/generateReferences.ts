const API_KEY = "blta0ff3cef332c7e34";
const MANAGEMENT_TOKEN = "cs12d75480f66ef53252922e8f";
const BASE_URL = `https://api.contentstack.io/v3`;

if (!API_KEY || !MANAGEMENT_TOKEN) {
  console.error("❌ Missing Contentstack API_KEY or MANAGEMENT_TOKEN.");
}

// 🔄 In-memory cache to avoid fetching the same schema multiple times
const schemaCache: Record<string, any[]> = {};

async function getContentTypeSchema(contentTypeUid: string): Promise<any[]> {
  if (contentTypeUid === "landing_page") {
    console.warn(`⏭️ Skipping schema fetch for "${contentTypeUid}"`);
    return []; // Return empty schema to skip
  }

  if (schemaCache[contentTypeUid]) {
    return schemaCache[contentTypeUid];
  }

  const response = await fetch(`${BASE_URL}/content_types/${contentTypeUid}`, {
    headers: {
      api_key: API_KEY,
      authorization: MANAGEMENT_TOKEN,
      "Cache-Control": "no-cache",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Failed to fetch content type "${contentTypeUid}": ${errorBody}`);
  }

  const data = await response.json();

  schemaCache[contentTypeUid] = data.content_type.schema;
  return data.content_type.schema;
}

async function getReferencePathsRecursive(
  schema: any[],
  parentPath = '',
  depth = 0
): Promise<string[]> {
  const MAX_DEPTH = 5;
  if (depth >= MAX_DEPTH) return [];

  const paths: string[] = [];

  for (const field of schema || []) {
    const currentPath = parentPath ? `${parentPath}.${field.uid}` : field.uid;

    if (field.data_type === 'reference') {
      paths.push(currentPath);

      if (Array.isArray(field.reference_to)) {
        for (const refType of field.reference_to) {
          if (refType === "landing_page") {
            console.warn(`⏭️ Skipping reference field pointing to "${refType}"`);
            continue;
          }

          const refSchema = await getContentTypeSchema(refType);
          const nestedPaths = await getReferencePathsRecursive(refSchema, currentPath, depth + 1);
          paths.push(...nestedPaths);
        }
      }
    }

    if (field.data_type === 'group' && field.schema) {
      const nestedPaths = await getReferencePathsRecursive(field.schema, currentPath, depth);
      paths.push(...nestedPaths);
    }

    if (field.data_type === 'blocks' && Array.isArray(field.blocks)) {
      for (const block of field.blocks) {
        const nestedPaths = await getReferencePathsRecursive(block.schema, currentPath, depth);
        paths.push(...nestedPaths);
      }
    }
  }

  return paths;
}

export async function fetchReferencePaths(contentTypeUid: string): Promise<string[]> {
  const schema = await getContentTypeSchema(contentTypeUid);
  return await getReferencePathsRecursive(schema);
}
