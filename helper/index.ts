import Stack, {
  getAllContentTypes,
  resolveNestedEntry,
} from "../contentstack-sdk/index";
import { addEditableTags } from "@contentstack/utils";
import { AllEntries } from "../model/entries.model";
import { Page } from "../model/page.model";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
const envConfig = process.env.CONTENTSTACK_API_KEY
  ? process.env
  : publicRuntimeConfig;

const liveEdit = envConfig.CONTENTSTACK_LIVE_EDIT_TAGS === "true";

export const getAllEntries = async (content_type : string): Promise<AllEntries> => {
  const response: AllEntries = (await Stack.getEntry({
    contentTypeUid: content_type,
    referenceFieldPath: undefined,
    jsonRtePath: undefined,
  })) as AllEntries;
  liveEdit &&
    response[0].forEach((entry) => addEditableTags(entry, "page", true));
  return response[0] as AllEntries;
};

export const getPageRes = async (
  entryUrl: string,
  contentTypeUid: string,
  locale: string = "en-us",
   params?: {
    include_variants?: boolean;
    personalize_variants?: string;
  }
): Promise<Page> => {
  const defaultVariant = "0_0";

  const options = {
    contentTypeUid,
    entryUrl,
    referenceFieldPath: [],
    locale,
    params,
  };

  console.log("📤 Contentstack API Request Options:", options);

  const response: Page[] = (await Stack.getEntryByUrl(options)) as Page[];

  console.log("📥 Raw Response:", JSON.stringify(response, null, 2));

  if (!response?.length) throw new Error("Page not found");

  const resolved = await resolveNestedEntry(response[0]);

  console.log("✅ Final Resolved Entry:", resolved?.title, "Variant ID:", resolved?.variant_id);

  if (liveEdit) {
    addEditableTags(resolved, "page", true);
  }

  return resolved as Page;
};


export const isPage = async (): Promise<string[]> => {
  const response = await getAllContentTypes();
  return (
    response?.content_types
      ?.filter((content_type) => content_type?.options?.is_page === true)
      .map((content_type) => content_type?.uid)
  );
};

