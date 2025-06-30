import Link from "next/link";
import Image from "next/image";

export type BlogEntry = {
  title?: string;
  url?: string;
  description?: string;
  featured_image?: {
    url: string;
  };
  tags?: string[];
  publish_details?: {
    time: string;
  };
  uid?: string;
};

type Props = {
  blogs: BlogEntry[];
};

export default function BlogCards({ blogs }: Props) {
  return (
    <>
      <h1 className="blog-heading">All Blog Post</h1>
      <div className="blog-container">
        {blogs?.map((blog, index) => (
          <div className="blog-card" key={blog?.uid || index}>
            <Link href={blog?.url || "#"}>
              <div className="blog-inner">
                {blog?.featured_image?.url && (
                  <div className="blog-card-image">
                    <Image
                      src={blog?.featured_image?.url}
                      alt={blog?.title || "Blog Image"}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                )}
                <div className="blog-card-body">
                  <h3 className="blog-title">{blog?.title}</h3>
                  {blog?.description && (
                    <div
                      className="blog-description"
                      dangerouslySetInnerHTML={{
                        __html:
                          blog?.description || "No description available.",
                      }}
                    />
                  )}

                  <div className="blog-meta">
                    <span className="blog-date">
                      {blog?.publish_details?.time
                        ? new Date(
                            blog?.publish_details?.time
                          ).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })
                        : "Invalid Date"}
                    </span>
                    <div className="blog-tags">
                      {(blog?.tags?.length ? blog?.tags : ["Technology"]).map(
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
