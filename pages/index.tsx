import React, { useState, useEffect } from "react";
import type { GetStaticProps, NextPage } from "next";
import { getPageRes } from "../helper";
import RenderComponents from "../components/render-components";
import { Page } from "../model/page.model";
import { getAllEntriesByContentType, onEntryChange } from "../contentstack-sdk";
import Skeleton from "react-loading-skeleton";
import { fetchReferencePaths } from "../contentstack-sdk/generateReferences";
import Layout from "../components/layout";

interface PageProps {
  page: Page;
  pageUrl: string;
  header;
  footer;
}

const Home: NextPage<PageProps> = ({ page, pageUrl, header, footer }) => {
  const [getEntry, setEntry] = useState(page);

  async function fetchData() {
    try {
      console.info("fetching live preview data...");
      const entryRes = await getPageRes(pageUrl);
      const [entries] = await fetchReferencePaths("page");
      console.log("Onlu filter", entries);

      console.log("Entry Response:", entryRes);
      setEntry(entryRes);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    onEntryChange(fetchData);
  }, []);

  return (
    <Layout page={page} header={header} footer={footer} entries={[]}>
      {getEntry ? (
        <RenderComponents
          pageComponents={getEntry}
          entryUid={getEntry?.uid}
          contentTypeUid="page"
          locale={getEntry?.locale}
        />
      ) : (
        <Skeleton />
      )}
    </Layout>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  try {
    const entries = await getAllEntriesByContentType("header");
    const header = entries?.[0] || null;

    const footerentries = await getAllEntriesByContentType("footer");
    const footer = footerentries?.[0] || null;

    const res: Page = await getPageRes("/");

    if (!res) throw new Error("Not found");

    return {
      props: { page: res, pageUrl: "/", header, footer },
      revalidate: 1000,
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
};
