import React, { useEffect, useState } from "react";
import { getEntryByUid } from "../contentstack-sdk";
import Link from "next/link";

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

interface LinkListProps {
  title: string;
  links: LinkListBlock[];
}

interface PageReference {
  title: string;
  url: string;
}

export default function LinkList({ title, links }: LinkListProps) {
  const [resolvedLinksMap, setResolvedLinksMap] = useState<PageReference[]>([]);

  useEffect(() => {
    const resolveReferences = async () => {
      const promises = links.map(async (item) => {
        const ref = item.links.page_reference?.[0];
        if (ref?._content_type_uid && ref?.uid) {
          try {
            const entry = await getEntryByUid(ref._content_type_uid, ref.uid);
            return {
              title: entry.title,
              url: entry.url,
            };
          } catch (err) {
            console.error("Error resolving entry", err);
            return null;
          }
        }
        return null;
      });

      const resolved = (await Promise.all(promises)).filter(
        Boolean
      ) as PageReference[];
      setResolvedLinksMap(resolved);
    };

    resolveReferences();
  }, [links]);

  if (!resolvedLinksMap.length) return null;
  return (
    <div className="flex flex-col lg:flex-row gap-10 mx-5 md:mx-0">
      {resolvedLinksMap.map((link, index) => (
        <div key={index}>
          <ul>
            <li className="item0 odd first link-list">
              <Link
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="sub-menu"
              >
                {link.title}
              </Link>
            </li>
          </ul>
        </div>
      ))}
    </div>
  );
}
