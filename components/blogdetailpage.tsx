import Image from "next/image";

export default function BlogDetailPage({ blog }: { blog: any }) {
  if (!blog) {
    return <div className="blog-landing-page-container">Blog Not Found</div>;
  }

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
  );
}
