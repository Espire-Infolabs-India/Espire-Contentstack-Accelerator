import React, { useState, useEffect } from "react";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { getAllEntries, getPageRes } from "../helper";
import RenderComponents from "../components/render-components";
import { Page } from "../model/page.model";
import { AllEntries } from "../model/entries.model";
import { getAllEntriesByContentType, onEntryChange } from "../contentstack-sdk";
import Skeleton from "react-loading-skeleton";
import Layout from "../components/layout";

interface PageProps {
  page: Page;
  pageUrl: string;
  header;
  footer;
}

const Pages: NextPage<PageProps> = ({ page, pageUrl, header, footer }) => {
  const [getEntry, setEntry] = useState(page);

  async function fetchData() {
    try {
      console.info("fetching live preview data...");
      const entryRes = await getPageRes(pageUrl, 'page');
      setEntry(entryRes);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    onEntryChange(fetchData);
  }, [page]);

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
        <Skeleton height={300} count={3} />
      )}
    </Layout>
  );
};

export default Pages;

export const getStaticPaths: GetStaticPaths = async () => {
  //@ts-ignore
  const entryPaths: AllEntries[] = await getAllEntries();
  const paths: { params: { page: string } }[] = [];
  entryPaths.forEach((entry) => {
    if (entry.url !== "/blog" && entry.url !== "/")
      paths.push({ params: { page: entry.url.toString() } });
  });

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const entries = await getAllEntriesByContentType("header");
    const header = entries?.[0] || null;

    const footerentries = await getAllEntriesByContentType("footer");
    const footer = footerentries?.[0] || null;
    if (!params || !params.page) return { props: { page: {}, pageUrl: "" } };
    const paramsPath = params?.page.includes("/")
      ? `${params.page}`
      : `/${params?.page}`;
    const res: Page = await getPageRes(`${paramsPath}`,'page');
    if (!res) throw "Error 404";
    return {
      props: {
        page: res,
        pageUrl: paramsPath,
        header,
        footer,
      },
      revalidate: 1000,
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
};
