import React, { useState, useEffect } from "react";
import type { GetStaticProps, NextPage } from "next";
import { getPageRes } from "../helper";
import RenderComponents from "../components/render-components";
import { Page } from "../model/page.model";
import { getAllEntriesByContentType, onEntryChange } from "../contentstack-sdk";
import Skeleton from "react-loading-skeleton";
import Layout from "../components/layout";

import Globalcards from "../components/globalcards";
import ContactUsForm from "../components/contactusform";
import FeaturesTabs from "../components/featuresTabs";
import MissionVision from "../components/missionvision";

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

const Home: NextPage<PageProps> = ({ page, pageUrl, header, footer, locale }) => {
  const [getEntry, setEntry] = useState(page);
  const { locale: activeLocale } = useRouter();
  async function fetchData() {
    try {
      
      const entryRes = await getPageRes(pageUrl,"page",activeLocale,getSiteName());
      setEntry(entryRes);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    onEntryChange(fetchData);
  }, [activeLocale, pageUrl]);

  return (
    <Layout page={page} header={header} footer={footer} seo={page?.seo}>
      {getEntry ? (
        <main>
          <RenderComponents
            pageComponents={getEntry}
            entryUid={getEntry?.uid}
            contentTypeUid="page"
            locale={getEntry?.locale}
          />

          <Globalcards />
          <ContactUsForm />
          <FeaturesTabs />
          <MissionVision />
          
        </main>
      ) : (
        <Skeleton />
      )}
    </Layout>
  );
};

export default Home;

export function getSiteName(): string { 
  return process.env.NEXT_PUBLIC_SITE_NAME   || "Site-1";
}

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const { locale } = context;
    const entries = await getAllEntriesByContentType("header", locale);
    const header = entries?.[0] || null;

    const footerentries = await getAllEntriesByContentType("footer", locale);
    const footer = footerentries?.[0] || null;

     
    const res: Page = await getPageRes("/" , "page",locale,getSiteName());
 
    if (!res) throw new Error("Not found");

    return {
      props: { page: res, pageUrl: "/", header, footer, locale },
      revalidate: 1000,
    };
  } catch (error) {
      console.error(error);
    return {
      notFound: true,
    };
  }
};
