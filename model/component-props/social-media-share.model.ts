export type SocialMediaShare = {
  icon: {
    url: string;
  };
  title: string;
  url: {
    href: string;
  };
};

export interface SocialMediaProps {
  items: SocialMediaShare[];
}
