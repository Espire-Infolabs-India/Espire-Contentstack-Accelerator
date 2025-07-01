import Link from "next/link";
import Image from "next/image";
import LinkList from "../components/linklist";
import SocialMedia from "../components/socialmedia";
import Separator from "./seperator";

type ReferenceEntry = {
  uid: string;
  _content_type_uid: string;
};

type LinkListBlock = {
  links: {
    title: string;
    page_reference: ReferenceEntry[];
    open_in_new_tab: boolean;
  };
};

type SocialMediaShare = {
  icon: {
    url: string;
  };
  title: string;
  url: {
    href: string;
  };
};

type FooterContentType = {
  uid: string;
  title?: string;
  logo?: { url: string };
  address?: string;
  copyright_text?: string;
  quick_links?: {
    title: string;
    link_list: LinkListBlock[];
  };
  social_media?: {
    social_media_share: SocialMediaShare[];
  };
};

export default function Footer({ data }: { data?: FooterContentType }) {
  if (!data) return null;

  return (
    <footer className="bg-[var(--royalblue)] text-white pt-[20px] pb-[80px]">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {data.logo?.url && (
            <div className="mb-6 md:mb-0">
              <Link href="/">
                <Image
                  className="w-24"
                  src={
                    data.logo.url.startsWith("//")
                      ? `https:${data.logo.url}`
                      : data.logo.url
                  }
                  alt="Footer Logo"
                  width={100}
                  height={70}
                  loading="lazy"
                />
              </Link>
            </div>
          )}

          <div className="flex flex-col lg:flex-row items-center gap-12 text-[16px]">
            <LinkList
              title={data?.quick_links?.title as string}
              links={data.quick_links?.link_list || []}
            />
          </div>
        </div>

        {data.address && (
          <div className="mt-12 flex flex-col lg:flex-row justify-between md:text-left">
            <div
              className="text-sm text-white text-center lg:text-left mb-5 lg:mb-0"
              dangerouslySetInnerHTML={{ __html: data.address }}
            />

            <div className="flex flex-col gap-12 mb-5 lg:mb-0">
              <SocialMedia
                items={data?.social_media?.social_media_share || []}
              />
            </div>
          </div>
        )}
        <Separator />
        {data.copyright_text && (
          <p className="text-center lg:text-left text-sm">
            {data.copyright_text}
          </p>
        )}
      </div>
    </footer>
  );
}
