import React from "react";

type Link = {
  uid: string;
  title: string;
  url: string;
};

interface LinkListProps {
  links: Link[];
}

export default function LinkList({ links }: LinkListProps) {
  return (
    <ul className="flex gap-4 text-sm font-medium">
      {links.map((link) => (
        <li key={link.uid}>
          <a href={link.url} className="hover:underline">
            {link.title}
          </a>
        </li>
      ))}
    </ul>
  );
}
