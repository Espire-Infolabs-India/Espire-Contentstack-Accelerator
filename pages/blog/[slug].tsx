import { GetStaticProps, GetStaticPaths } from "next";
import { initializeContentStackSdk } from "../../contentstack-sdk/utils";
import Image from "next/image";

const Stack = initializeContentStackSdk();

export default function BlogDetail({ blog }: { blog: any }) {
  if (!blog)
    return <div className="blog-landing-page-container">Blog Not Found</div>;

  const {
    title,
    shorttitle,
    summary,
    publish_details,
    featured_image,
    tags,
    description,
  } = blog;

  const formattedDate = publish_details?.time
    ? new Date(publish_details.time).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "Invalid Date";

  return (
    <>
      <div className="blog-landing-page-container">
        {featured_image?.url && (
          <div className="blog-landing-page-image-wrapper">
            <Image
              src={featured_image?.url}
              alt={title}
              layout="fill"
              objectFit="cover"
              className="blog-landing-page-featured-image"
            />
          </div>
        )}

        <div className="blog-landing-page-content">
          {shorttitle && (
            <h2 className="blog-landing-page-title">{shorttitle}</h2>
          )}
          {summary && <p className="blog-landing-page-summary">{summary}</p>}
          <p className="blog-landing-page-date">{formattedDate}</p>
        </div>
        <div>
          {title && <h1 className="blog-landing-page-subtitle">{title}</h1>}
          {description && (
            <p className="blog-landing-page-description">{description}</p>
          )}

          <div className="blog-landing-page-tags">
            {(tags?.length ? tags : ["Technology"]).map((tag: string) => (
              <span key={tag} className="tag-landing-page-pill">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const Query = Stack.ContentType("blog_post").Query().toJSON();
    const [entries] = await Query.find();

    const paths = entries.map((entry: any) => {
      const cleanSlug = entry.url.replace(/^\/blog\//, "");
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
