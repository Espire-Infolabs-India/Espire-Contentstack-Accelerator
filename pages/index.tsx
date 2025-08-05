import React, { useState, useEffect } from "react";
import type { GetStaticProps, NextPage } from "next";
import { getPageRes } from "../helper";
import RenderComponents from "../components/render-components";
import { Page } from "../model/page.model";
import {
  getAllEntriesByContentType,
  onEntryChange,
} from "../contentstack-sdk";
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
  header: any;
  footer: any;
  locale?: string;
  seo: SEOProps;
}

const Home: NextPage<PageProps> = ({
  page,
  pageUrl,
  header,
  footer,
  locale,
}) => {
  const [getEntry, setEntry] = useState(page);
  const { locale: activeLocale } = useRouter();

  async function fetchData() {
    try {
      const personalize_variants =
        new URLSearchParams(window.location.search).get(
          "personalize_variants"
        ) || "0_0";

      const entryRes = await getPageRes("/", "page", activeLocale,getSiteName(), {
        include_variants: true,
        personalize_variants,
      });
      console.log("🔥 Live Preview Entry:", entryRes);
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

          {/* Our Global location card design as per figma design */}
          <Globalcards /> 

           {/* Contact us form design as per figma design */}
          <ContactUsForm /> 

         {/* features section design as per figma design */}
          <FeaturesTabs /> 

        {/* our Mission section design as per figma design */}
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
    console.log("context", context);
    const personalize_variants = "0_3";
console.log("personalize_variants value", personalize_variants);
    const entries = await getAllEntriesByContentType("header", locale);
    const header = entries?.[0] || null;

    const footerentries = await getAllEntriesByContentType("footer", locale);
    const footer = footerentries?.[0] || null;

    const res: Page = await getPageRes("/", "page", locale, getSiteName(), {
      include_variants: true,
      personalize_variants,
    });
    console.log("static res",res)

    if (!res) throw new Error("Page not found");

    return {
      props: {
        page: res,
        pageUrl: "/",
        header,
        footer,
        locale,
      },
      revalidate: 1000, // ISR interval
    };
  } catch (error) {
      console.error(error);
    return {
      notFound: true,
    };
  }
};
