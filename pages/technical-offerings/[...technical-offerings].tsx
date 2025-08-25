import React, { useState, useEffect } from "react";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import Skeleton from "react-loading-skeleton";

import Layout from "../../components/layout";
import RenderComponents from "../../components/render-components";

import { getAllEntries, getPageRes } from "../../helper";
import {
  getAllEntriesByContentType,
  onEntryChange,
} from "../../contentstack-sdk";

import { Page } from "../../model/page.model";
import { AllEntries } from "../../model/entries.model";
import { SEOProps } from "../../model/common.model";

interface PageProps {
  page: Page;
  pageUrl: string;
  header: any;
  footer: any;
  locale?: string;
  seo: SEOProps;
}

const TechnicalOfferingsPage: NextPage<PageProps> = ({
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
      console.info("fetching live preview data...");
      const entryRes = await getPageRes(
        pageUrl,
        "_technical_solution",
        activeLocale,
        getSiteName()
      );
      setEntry(entryRes);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    onEntryChange(fetchData);
  }, [pageUrl, activeLocale]);

  return (
    <Layout page={getEntry} header={header} footer={footer} seo={getEntry?.seo}>
      {getEntry ? (
        <RenderComponents
          pageComponents={getEntry}
          entryUid={getEntry?.uid}
          contentTypeUid="_technical_solution"
          locale={getEntry?.locale}
        />
      ) : (
        <Skeleton height={300} count={3} />
      )}
    </Layout>
  );
};

export default TechnicalOfferingsPage;

export const getStaticPaths: GetStaticPaths = async () => {
  //@ts-ignore

  const entryPaths: AllEntries[] = await getAllEntries("_technical_solution","en-us",getSiteName());
  const paths: { params: { "technical-offerings": string[] } }[] = [];
  entryPaths.forEach((entry) => {
    if (entry?.url && entry?.url.startsWith("/technical_offerings/")) {
      const slug = entry?.url.replace("/technical_offerings/", "");
      if (slug) {
        paths.push({
          params: {
            "technical-offerings": slug.split("/"),
          },
        });
      }
    }
  });

  return {
    paths,
    fallback: "blocking",
  };
};
export function getSiteName(): string { 
  return process.env.NEXT_PUBLIC_SITE_NAME   || "Site-1";
}
export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  try {
    
    const headerEntries = await getAllEntriesByContentType("header", locale);
    const header = headerEntries?.[0] || null;

    const footerEntries = await getAllEntriesByContentType("footer", locale);
    const footer = footerEntries?.[0] || null;

    if (!params || !params["technical-offerings"]) {
      return { notFound: true };
    }

    const slugParts = params["technical-offerings"];
    const pageUrl = `/technical-offerings/${
      Array.isArray(slugParts) ? slugParts.join("/") : slugParts
    }`;

    
    const res: Page = await getPageRes(pageUrl, "_technical_solution", locale,getSiteName());
   // console.warn("Page response:", res);
    if (!res) throw "Page not found";

    return {
      props: {
        page: res,
        pageUrl,
        header,
        footer,
        locale,
      },
      revalidate: 60,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
