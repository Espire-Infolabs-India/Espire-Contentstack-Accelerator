import React, { useState, useEffect } from "react";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { getAllEntries, getPageRes } from "../helper";
import RenderComponents from "../components/render-components";
import { Page } from "../model/page.model";
import { AllEntries } from "../model/entries.model";
import { getAllEntriesByContentType, onEntryChange } from "../contentstack-sdk";
import Skeleton from "react-loading-skeleton";
import Layout from "../components/layout";
import { useRouter } from "next/router";
import { SEOProps } from "../model/common.model";
interface PageProps {
  page: Page;
  pageUrl: string;
  header;
  footer;  
  locale?: string;
  seo : SEOProps
}

const Pages: NextPage<PageProps> = ({ page, pageUrl, header, footer, locale }) => {
  const [getEntry, setEntry] = useState(page);
  const { locale: activeLocale } = useRouter();
  const router = useRouter();
  const { q } = router.query;

  async function fetchData() {
    try {
      console.info("fetching live preview data...");
      const entryRes = await getPageRes(pageUrl, 'page',activeLocale,getSiteName());
      setEntry(entryRes);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    onEntryChange(fetchData);
  }, [page,activeLocale]);

  useEffect(() => {
  if (q) {
    fetchData(); // Trigger data fetch when search query changes
  }
}, [q]);

  return (
    
    <Layout page={page} header={header} footer={footer} seo={page?.seo}>
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
  const entryPaths: AllEntries[] = await getAllEntries("page",getSiteName()); 
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

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  try {
    
    const entries = await getAllEntriesByContentType("header",locale);
    const header = entries?.[0] || null;

    const footerentries = await getAllEntriesByContentType("footer",locale);
    const footer = footerentries?.[0] || null;
    if (!params || !params.page) return { props: { page: {}, pageUrl: "" } };
    const paramsPath = params?.page.includes("/")
      ? `${params.page}`
      : `/${params?.page}`; 
      const res: Page = await getPageRes(`${paramsPath}`,'page',locale,getSiteName());
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
export function getSiteName(): string {
  return process.env.NEXT_PUBLIC_SITE_NAME || "Site-1";
}