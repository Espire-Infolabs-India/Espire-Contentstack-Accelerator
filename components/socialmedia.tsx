import React from "react";
import Image from "next/image";
import Link from "next/link";

type SocialMediaShare = {
  icon: {
    url: string;
  };
  title: string;
  url: {
    href: string;
  };
};

interface SocialMediaProps {
  items: SocialMediaShare[];
}

const SocialMedia = ({ items }: SocialMediaProps) => {
  if (!Array.isArray(items) || !items.length) {
    console.error("Expected 'items' to be an array but got:", items);
    return null;
  }

  return (
    <div className="flex items-center justify-center w-full">
      {items.map((item, index) => {
        const imageUrl = item.icon?.url;
        const altText = item.title || "Social Media";
        const resolvedUrl = imageUrl?.startsWith("//")
          ? `https:${imageUrl}`
          : imageUrl;

        const linkHref =
          item.url?.href?.startsWith("http") || item.url?.href?.startsWith("/")
            ? item.url.href
            : `https://${item.url.href}`;

        return (
          <div className="px-4 socialmedia" key={index}>
            <Link href={linkHref} target="_blank" title={item.url?.href}>
              {resolvedUrl ? (
                <Image
                  src={resolvedUrl}
                  alt={altText}
                  width={24}
                  height={24}
                  className="h-6 w-6"
                />
              ) : (
                <span className="text-white text-sm">{item.title}</span>
              )}
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default SocialMedia;
