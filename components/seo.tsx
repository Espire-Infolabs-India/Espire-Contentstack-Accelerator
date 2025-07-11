import Head from "next/head";
import React from "react";
import { SEOProps } from "../model/common.model";

const SEO = ({ data }: { data?: SEOProps }) => {
  const currentUrl =
    typeof window !== "undefined"
      ? window.location.origin + window.location.pathname
      : "";

  const robotsContent = `${data?.nofollow ? "nofollow" : "follow"}, ${
    data?.noindex ? "noindex" : "index"
  }`;

  return (
    <Head>
      <title>{data?.meta_title}</title>
      {currentUrl && <link rel="canonical" href={currentUrl} />}
      <meta property="og:title" content={data?.open_graph_title} />
      <meta property="og:description" content={data?.open_graph_description} />
      <meta property="og:image" content={data?.open_graph_image?.url} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content="website" />
      <meta name="twitter:title" content={data?.twitter_title} />
      <meta name="twitter:description" content={data?.twitter_description} />
      <meta name="twitter:image" content={data?.twitter_image?.url} />
      <meta name="author" content={data?.author} />
      <meta name="twitter:site" content={currentUrl} />
      <meta name="keywords" content={data?.keywords as unknown as string} />
      <meta name="description" content={data?.meta_description} />
      <meta name="robots" content={robotsContent} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
  );
};

export default SEO;
