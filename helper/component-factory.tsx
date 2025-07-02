import HeroBanner from "../components/hero-banner";
import Promo from "../components/promo";
import CTA from "../components/cta";
import BlogListing from "../components/bloglisting";

export const ComponentMap: Record<string, (data: any) => JSX.Element> = {
  hero_banner: (data) => <HeroBanner {...data} />,
  promo: (data) => <Promo {...data} />,
  cta: (data) => <CTA {...data} />,
  blog_listing: () => <BlogListing />,
};
