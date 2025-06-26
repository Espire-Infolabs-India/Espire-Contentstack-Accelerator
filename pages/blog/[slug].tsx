import { GetStaticProps, GetStaticPaths } from "next";
import { initializeContentStackSdk } from "../../contentstack-sdk/utils";
import BlogDetailPage from "../../components/blogdetailpage";

const Stack = initializeContentStackSdk();

export default function BlogDetail({ blog }: { blog: any }) {
  if (!blog)
    return <div className="blog-landing-page-container">Blog Not Found</div>;
  return (
    <>
      <BlogDetailPage blog={blog} />;
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const Query = Stack.ContentType("blog_post").Query().toJSON();
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

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const slug = params?.slug as string;

    if (!slug) {
      return {
        notFound: true,
      };
    }

    const fullPath = `/blog/${slug}`;

    const Query = Stack.ContentType("blog_post")
      .Query()
      .where("url", fullPath)
      .toJSON();

    const [entries] = await Query.find();
    const blog = entries[0] || null;

    return {
      props: { blog },
      revalidate: 60,
    };
  } catch (error) {
    console.error("Error in getStaticProps:", error);
    return {
      notFound: true,
    };
  }
};
