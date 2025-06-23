import Stack from "../contentstack-sdk/index";
import { addEditableTags } from "@contentstack/utils";
import { AllEntries } from "../model/entries.model";
import { Page } from "../model/page.model";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
const envConfig = process.env.CONTENTSTACK_API_KEY
  ? process.env
  : publicRuntimeConfig;

const liveEdit = envConfig.CONTENTSTACK_LIVE_EDIT_TAGS === "true";

export const getAllEntries = async (): Promise<AllEntries> => {
  const response: AllEntries = (await Stack.getEntry({
    contentTypeUid: "page",
    referenceFieldPath: undefined,
    jsonRtePath: undefined,
  })) as AllEntries;
  liveEdit &&
    response[0].forEach((entry) => addEditableTags(entry, "page", true));
  return response[0] as AllEntries;
};

export const getPageRes = async (entryUrl: string): Promise<Page> => {
  const response: Page[] = (await Stack.getEntryByUrl({
    contentTypeUid: "page",
    entryUrl,
    referenceFieldPath: [
      "page_components",
      "page_components.cta",
      "page_components.cta.cta_url",
    ],
    // jsonRtePath: [
    //     'page_components.from_blog.featured_blogs.body',
    //     'page_components.section_with_buckets.buckets.description',
    //     'page_components.section_with_html_code.description',
    // ],
  })) as Page[];
  liveEdit && addEditableTags(response[0], "page", true);
  return response[0] as Page;
};
