import Link from "next/link";
import React from "react";

type Link = {
  uid: string;
  title: string;
  url: string;
};

interface LinkListProps {
  title: string;
  links: Link[];
}

export default function LinkList({ title, links }: LinkListProps) {
  if (!links?.length) return null;

  return (
    <div className="flex flex-col lg:flex-row gap-10 mx-5 md:mx-0">
      {links?.map((link) => (
        <div key={link?.uid}>
          <ul>
            <li className="item0 odd first link-list">
              <Link href={link?.url} title="" target="" className="sub-menu">
                {link?.title}
              </Link>
            </li>
          </ul>
        </div>
      ))}
    </div>
  );
}
