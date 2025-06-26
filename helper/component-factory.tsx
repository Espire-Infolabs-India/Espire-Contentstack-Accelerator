import HeroBanner from "../components/hero-banner";
import CTA from "../components/cta";
import BlogListing from "../components/bloglisting";

export const ComponentMap: Record<string, (data: any) => JSX.Element> = {
  hero_banner: (data) => <HeroBanner hero_banner={data} />,
  cta: (data) => <CTA cta={data} />,
  blog_listing: () => <BlogListing />,
};
