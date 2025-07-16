import HeroBanner from "../components/hero-banner";
import Promo from "../components/promo";
import CTA from "../components/cta";
import BlogListing from "../components/bloglisting";
import Carousel from "../components/carousel";
import Seperator from "../components/seperator";
import SocialMediaShare from "../components/social-media-share";
import LinkList from "../components/link-list";
import ImageComponent from "../components/ImageComponent";
import ExternalApiResults from "../components/externalapi";
import PlainHtmlComponent from "../components/plainhtml";
import Search from "../components/Search";
import FeatureHighlightComponent from "../components/featurehighlights";

export const ComponentMap: Record<string, (data: any) => JSX.Element> = {
  hero_banner: (data) => <HeroBanner {...data} />,
  promo: (data) => <Promo {...data} />,
  cta: (data) => <CTA {...data} />,
  blog_listing: () => <BlogListing />,
  carousel: (data) => <Carousel {...data} />,
  seperator: () => <Seperator />,
  social_media_share: (data) => <SocialMediaShare {...data} />,
  link_list: (data) => <LinkList {...data} />,
  image_component: (data) => <ImageComponent {...data} />,
  external_api: (data) => <ExternalApiResults {...data} />,
  plain_html: (data) => <PlainHtmlComponent {...data} />,
  search: (data) => <Search {...data} />,
  feature_highlights: (data) => <FeatureHighlightComponent {...data} />,
};
