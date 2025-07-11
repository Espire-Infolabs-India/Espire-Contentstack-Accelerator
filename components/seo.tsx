import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { SEOProps } from "../model/common.model";

const SEO = ({ data }: { data?: SEOProps }) => {
  const [currentUrl, setCurrentUrl] = useState("");
  const router = useRouter();

  useEffect(() => {
    const origin = window.location.origin;
    setCurrentUrl(origin + router.asPath);
  }, [router.asPath]);

  const robotsContent = `${data?.nofollow ? "nofollow" : "follow"}, ${
    data?.noindex ? "noindex" : "index"
  }`;

  return (
    <>
      <Head>
        {currentUrl && (
          <>
            <link rel="canonical" href={currentUrl} key="canonical" />
            <meta property="og:url" content={currentUrl} key="og:url" />
            <meta name="twitter:site" content={currentUrl} key="twitter:site" />
          </>
        )}
        <meta name="title" content={data?.meta_title || ""} />
        <meta name="description" content={data?.meta_description || ""} />
        <meta property="og:title" content={data?.open_graph_title || ""} />
        <meta
          property="og:description"
          content={data?.open_graph_description || ""}
        />
        <meta property="og:image" content={data?.open_graph_image?.url || ""} />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content={data?.twitter_title || ""} />
        <meta
          name="twitter:description"
          content={data?.twitter_description || ""}
        />
        <meta name="twitter:image" content={data?.twitter_image?.url || ""} />
        <meta name="author" content={data?.author || ""} />
        <meta
          name="keywords"
          content={(data?.keywords as unknown as string) || ""}
        />
        <meta name="robots" content={robotsContent} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
    </>
  );
};

export default SEO;
