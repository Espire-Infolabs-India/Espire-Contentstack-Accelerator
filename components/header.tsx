import { useEffect, useState } from "react";
import { getAllEntriesByContentType, getEntryByUid } from "../contentstack-sdk";
import NavigationItem from "../components/navigationitem";
import LinkList from "./linklist";
import Link from "next/link";
import Image from "next/image";
import SearchBox from "./searchbox";

type ReferenceEntry = {
  uid: string;
  _content_type_uid: string;
};

type SubLink = {
  uid: string;
  title: string;
  url: string;
};

type NavigationEntry = {
  uid: string;
  title: string;
  url: string;
  sub_links?: ReferenceEntry[] | SubLink[];
};

type HeaderContentType = {
  uid: string;
  title?: string;
  logo?: {
    url: string;
  };
  primary_navigation?: ReferenceEntry[];
  secondary_navigation?: ReferenceEntry[];
};

export default function Header() {
  const [header, setHeader] = useState<HeaderContentType | null>(null);
  const [primaryNavItems, setPrimaryNavItems] = useState<NavigationEntry[]>([]);
  const [secondaryNavItems, setSecondaryNavItems] = useState<NavigationEntry[]>(
    []
  );

  useEffect(() => {
    async function fetchHeaderAndReferences() {
      const entries = await getAllEntriesByContentType("header");
      const headerEntry = entries?.[0] as HeaderContentType | undefined;
      if (!headerEntry) return;
      setHeader(headerEntry);
      if (headerEntry.primary_navigation?.length) {
        const resolvedPrimary = await Promise.all(
          headerEntry.primary_navigation.map(async (ref: ReferenceEntry) => {
            const navItem = (await getEntryByUid(
              ref._content_type_uid,
              ref.uid
            )) as NavigationEntry;
            if (Array.isArray(navItem.sub_links)) {
              navItem.sub_links = await Promise.all(
                navItem.sub_links.map(async (sub: any) => {
                  if (sub.uid && sub._content_type_uid) {
                    return await getEntryByUid(sub._content_type_uid, sub.uid);
                  }
                  return sub;
                })
              );
            }

            return navItem;
          })
        );

        setPrimaryNavItems(resolvedPrimary.filter(Boolean));
      }
      if (headerEntry.secondary_navigation?.length) {
        const resolvedSecondary = await Promise.all(
          headerEntry.secondary_navigation.map(
            (ref: ReferenceEntry) =>
              getEntryByUid(
                ref._content_type_uid,
                ref.uid
              ) as Promise<NavigationEntry>
          )
        );
        setSecondaryNavItems(resolvedSecondary.filter(Boolean));
      }
    }

    fetchHeaderAndReferences();
  }, []);
  if (!header) return null;
  return (
    <div className="bg-blue-900 text-white">
      <header className="container mx-auto px-4 py-3">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          {/* Left: Logo + Search */}
          <div className="flex items-center gap-4 w-full lg:w-auto">
            {header.logo?.url && (
              <Link href="/">
                <Image
                  src={
                    header.logo.url.startsWith("//")
                      ? `https:${header.logo.url}`
                      : header.logo.url
                  }
                  width={120}
                  height={60}
                  alt="Logo"
                  className="object-contain"
                />
              </Link>
            )}
            <div className="flex-1 max-w-md">
              <SearchBox />
            </div>
          </div>

          {/* Right: Secondary Nav + Language Dropdown */}
          <div className="flex items-center gap-4">
            <LinkList links={secondaryNavItems} />
            <select className="bg-white text-black rounded-md px-3 py-1 shadow-sm text-sm">
              <option value="en">English</option>
              <option value="de">Deutsch</option>
            </select>
          </div>
        </div>

        {/* Bottom: Primary Nav */}
        <nav className="mt-4">
          <ul className="flex gap-6 justify-center text-base font-medium">
            {primaryNavItems.map((navItem) => (
              <NavigationItem
                key={navItem.uid}
                uid={navItem.uid}
                url={navItem.url}
                title={navItem.title}
                sub_links={navItem.sub_links as SubLink[]}
              />
            ))}
          </ul>
        </nav>
      </header>
    </div>
  );
}
