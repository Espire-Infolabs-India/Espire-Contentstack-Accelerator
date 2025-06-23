import HeroBanner from "../components/hero-banner";
import CTA from "../components/cta";

export const ComponentMap: Record<string, (data: any) => JSX.Element> = {
  hero_banner: (data) => <HeroBanner hero_banner={data} />,
  cta: (data) => <CTA cta={data} />,
};
