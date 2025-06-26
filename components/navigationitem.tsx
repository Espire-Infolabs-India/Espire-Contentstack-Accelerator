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
  uid,
  url,
  title,
  sub_links,
}: NavigationItemProps) {
  return (
     <li className="relative group">
      <a href={url} className="hover:underline">{title}</a>

      {sub_links?.length ? (
        <ul className="absolute left-0 top-full mt-2 hidden group-hover:block bg-white text-black shadow-lg py-2 rounded z-50 min-w-[200px]">
          {sub_links.map((sub) => (
            <li key={sub.uid}>
              <a
                href={sub.url}
                className="block px-4 py-2 hover:bg-blue-100"
              >
                {sub.title}
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </li>
  );
}
