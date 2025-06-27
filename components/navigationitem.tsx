import Link from "next/link";
import React from "react";

export interface NavigationItemProps {
  uid: string;
  title: string;
  url: string;
  sub_links?: {
    uid: string;
    title: string;
    url: string;
  }[];
}

export default function NavigationItem({
  url,
  title,
  sub_links,
}: NavigationItemProps) {
  return (
    <>
      <Link href={url}>{title}</Link>

      {sub_links?.length ? (
        <ul className="flex flex-col lg:flex-row lg:flex-wrap static lg:absolute z-50 left-0 lg:invisible lg:group-hover:visible rounded-b bg-white shadow-lg px-2 lg:px-0 mt-2 w-full">
          {sub_links.map((sub) => (
            <li key={sub.uid} className="last:border-none">
              <Link
                href={sub.url}
                className="block p-2 text-black lg:px-10 lg:py-4"
              >
                {sub.title}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
}
