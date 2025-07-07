import Link from "next/link";
import Image from "next/image";
import LinkList from "./link-list";
import Separator from "./seperator";
import SocialMediaShare from "./social-media-share";
import { FooterContentType } from "../model/component-props/footer.model";

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
              link_list={data?.quick_links?.link_list || []}
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
              <SocialMediaShare
                social_media_share={
                  data?.social_media?.social_media_share || []
                }
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
