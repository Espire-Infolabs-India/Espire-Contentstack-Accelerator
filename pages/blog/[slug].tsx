import { GetStaticProps, GetStaticPaths } from "next";
import { initializeContentStackSdk } from "../../contentstack-sdk/utils";
import BlogDetailPage from "../../components/blogdetailpage";
import { getAllEntriesByContentType } from "../../contentstack-sdk";
import Skeleton from "react-loading-skeleton";
import Layout from "../../components/layout";
import { SEOProps } from "../../model/common.model";
const Stack = initializeContentStackSdk();

export default function BlogDetail({
  blog,
  page,
  pageUrl,
  header,
  footer,
}: {
  blog: any;
  page: any;
  pageUrl: any;
  header: any;
  footer: any;
  seo : SEOProps
}) {
  return (
    <Layout page={page} header={header} footer={footer} seo={page?.seo}>
      {blog ? <BlogDetailPage blog={blog} /> : <Skeleton />}
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const Query = Stack.ContentType("blog_post").Query().language("en-us").where("site_configuration.site_section", getSiteName()).toJSON();
    const [entries] = await Query.find();

    const paths = entries.map((entry: any) => {
      const cleanSlug = entry?.url?.replace(/^\/blog\//, "");
      return {
        params: { slug: cleanSlug },
      };
    });

    return {
      paths,
      fallback: "blocking",
    };
  } catch (error) {
    console.error("Error in getStaticPaths:", error);
    return {
      paths: [],
      fallback: "blocking",
    };
  }
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  try {
    const slug = params?.slug as string;
    if (!slug) return { notFound: true };

    const fullPath = `/blog/${slug}`;

    const Query = Stack.ContentType("blog_post")
      .Query()
      .language(locale?.toLowerCase() || "en-us")
      .where("url", fullPath)
      .where("site_configuration.site_section", getSiteName())
      .toJSON();

    const [entries] = await Query.find();

    if (!entries || entries.length === 0) {
      return {
        notFound: true,
      };
    }

    const blog = entries[0];

    const headerentries = await getAllEntriesByContentType("header", locale);
    const footerentries = await getAllEntriesByContentType("footer", locale);
    const header = headerentries?.[0] || null;
    const footer = footerentries?.[0] || null;

    return {
      props: {
        blog,
        header,
        footer,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error("Error in getStaticProps:", error);
    return {
      notFound: true,
    };
  }
};

export function getSiteName(): string { 
  return process.env.NEXT_PUBLIC_SITE_NAME   || "Site-1";
}