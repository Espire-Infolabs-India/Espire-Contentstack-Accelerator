import { SEOProps } from "./common.model";
import { HeroBanner } from "./component-props/hero-banner.model";

export interface Img {
  $: any;
  url: string;
  title: string;
  filename: string;
}

export interface Link {
  $: any;
  title: string;
  href: string;
}

export interface Page {
  $: any;
  title: string;
  url: string;
  uid: string;
  locale: string;
  seo :SEOProps
  page_components: [
    {
      _content_type_uid: string;
      hero_banner: HeroBanner;
    }
  ];
}

