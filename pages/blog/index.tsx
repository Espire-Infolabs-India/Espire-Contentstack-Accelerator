import { GetStaticProps } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllBlogEntries } from "../../contentstack-sdk/index";

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
      <h1 className="blog-heading">All Blog Post</h1>
      <div className="blog-container">
        {blogs.map((blog) => (
          <div className="blog-card" key={blog.uid}>
            <Link href={blog.url}>
              <div className="blog-inner">
                {blog.featured_image?.url && (
                  <div className="blog-card-image">
                    <Image
                      src={blog.featured_image.url}
                      alt={blog.title}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                )}
                <div className="blog-card-body">
                  <h3 className="blog-title">{blog.title}</h3>
                  <p className="blog-description">
                    {blog.description || "No description available."}
                  </p>
                  <div className="blog-meta">
                    <span className="blog-date">
                      {blog.publish_details?.time
                        ? new Date(
                            blog.publish_details.time
                          ).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })
                        : "Invalid Date"}
                    </span>
                    <div className="blog-tags">
                      {(blog.tags?.length ? blog.tags : ["Technology"]).map(
                        (tag) => (
                          <span key={tag} className="tag-pill">
                            {tag}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const blogs = await getAllBlogEntries();
  return {
    props: {
      blogs,
    },
    revalidate: 60,
  };
};
