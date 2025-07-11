import { GetStaticProps } from "next";
import { getAllEntriesByContentType } from "../../contentstack-sdk/index";
import Skeleton from "react-loading-skeleton";
import Layout from "../../components/layout";
import { getPageRes } from "../../helper";
import { Page } from "../../model/page.model";
import { SEOProps } from "../../model/common.model";
import CaseStudyCards from "../../components/casestudycards";

type CaseStudyEntry = {
  title: string;
  url: string;
  publish_details?: {
    time: string;
  };
  uid: string;
  description?: string;
  featured_image?: {
    url: string;
  };
  tags?: string[];
};

type Props = {
  technicalofferings: CaseStudyEntry[];
  page: Page;
  pageUrl: string;
  header;
  footer;
  seo: SEOProps;
};

export default function TechnicalOfferingListing({
  page,
  pageUrl,
  header,
  footer,
  technicalofferings,
}: Props) {
  return (
    <>
      <Layout page={page} header={header} footer={footer} seo={page?.seo}>
        {technicalofferings ? (
          <CaseStudyCards casestudy={technicalofferings} />
        ) : (
          <Skeleton />
        )}
      </Layout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { locale } = context;
  const entries = await getAllEntriesByContentType(
    "header",
    locale?.toLowerCase() || "en-us"
  );
  const header = entries?.[0] || null;

  const footerentries = await getAllEntriesByContentType(
    "footer",
    locale?.toLowerCase() || "en-us"
  );
  const footer = footerentries?.[0] || null;
  const technicalofferings = await getAllEntriesByContentType(
    "_technical_solution",
    locale?.toLowerCase() || "en-us"
  );
  const res: Page = await getPageRes("/technical-offerings", "page");
  if (!res) throw new Error("Not found");
  return {
    props: {
      page: res,
      pageUrl: "/technical-offerings",
      technicalofferings,
      header,
      footer,
    },
    revalidate: 60,
  };
};
