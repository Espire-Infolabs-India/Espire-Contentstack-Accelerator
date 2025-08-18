import Script from "next/script";
import { SocialMediaFeed } from "../model/component-props/socialmediafeed.model";
const SocialMediaFeeds = (data: SocialMediaFeed) => {
  return (
    <div className="mx-5 md:mx-0">
      <h2>{data?.title}</h2>
      <div
        className={data?.classname}
        data-embed-id={data?.data_embed_id}
      ></div>
      <Script src={data?.script} strategy={"afterInteractive"}></Script>
    </div>
  );
};

export default SocialMediaFeeds;
