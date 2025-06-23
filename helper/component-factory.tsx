// component-map.ts
import HeroBanner from "../components/hero-banner";
import BlogBanner from "../components/blog-banner";
import Section from "../components/section";
import SectionBucket from "../components/section-bucket";
import AboutSectionBucket from "../components/about-section-bucket";
import BlogSection from "../components/blog-section";
import CardSection from "../components/card-section";
import SectionWithHtmlCode from "../components/section-with-html-code";
import TeamSection from "../components/team-section";
import CTA from "../components/cta";

export const ComponentMap: Record<
  string,
  (data: any, blogPost?: any) => JSX.Element
> = {
  hero_banner: (data, blogPost) => {
    return blogPost ? (
      <BlogBanner blog_banner={data} />
    ) : (
      <HeroBanner hero_banner={data} />
    );
  },

  section: (data) => <Section section={data} />,

  section_with_buckets: (data) =>
    data.bucket_tabular ? (
      <AboutSectionBucket sectionWithBuckets={data} />
    ) : (
      <SectionBucket section={data} />
    ),

  from_blog: (data) => <BlogSection blogs={data} />,

  section_with_cards: (data) => <CardSection cards={data.cards} />,

  section_with_html_code: (data) => <SectionWithHtmlCode embedCode={data} />,

  our_team: (data) => <TeamSection ourTeam={data} />,
  
  cta: (data) => <CTA cta={data} />,
};
