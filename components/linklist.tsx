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
    <div className="flex flex-col items-start">
      <h4 className="text-xs font-semibold uppercase text-gray-300 mb-1">
        {title}
      </h4>
      <ul className="flex gap-4 text-sm font-medium">
        {links?.map((link) => (
          <li key={link?.uid}>
            <a href={link?.url} className="hover:underline">
              {link?.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
