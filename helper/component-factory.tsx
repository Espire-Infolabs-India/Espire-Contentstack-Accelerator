import HeroBanner from "../components/hero-banner";
import Promo from "../components/promo";
import CTA from "../components/cta";
import BlogListing from "../components/bloglisting";
import Seperator from "../components/seperator";
import SocialMediaShare from "../components/social-media-share";
import LinkList from "../components/link-list";

export const ComponentMap: Record<string, (data: any) => JSX.Element> = {
  hero_banner: (data) => <HeroBanner {...data} />,
  promo: (data) => <Promo {...data} />,
  cta: (data) => <CTA {...data} />,
  blog_listing: () => <BlogListing />,
  seperator: () => <Seperator />,
  social_media_share: (data) => (
    <SocialMediaShare items={data?.social_media_share || []} />
  ),
  link_list: (data) => (
    <LinkList title={data?.title as string} links={data?.link_list || []} />
  ),
};

