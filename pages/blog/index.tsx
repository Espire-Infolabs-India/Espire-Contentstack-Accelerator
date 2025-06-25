import { GetStaticProps } from "next";
import { getAllEntriesByContentType } from "../../contentstack-sdk/index";
import BlogCards from "../../components/blogcards";

type BlogEntry = {
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
  blogs: BlogEntry[];
};

export default function BlogListing({ blogs }: Props) {
  return (
    <>
      <BlogCards blogs={blogs} />;
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const blogs = await getAllEntriesByContentType("blog_post");
  return {
    props: {
      blogs,
    },
    revalidate: 60,
  };
};
