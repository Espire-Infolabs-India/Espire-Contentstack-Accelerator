import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getEntryByUid } from "../contentstack-sdk";

type ReferenceEntry = {
  uid: string;
  _content_type_uid: string;
};

type PageReference = {
  title: string;
  url: string;
};

type Navigation = {
  navigation: {
    title: string;
    navigation_link: ReferenceEntry[];
    sub_navigation: ReferenceEntry[];
  };
};

type NavigationProps = {
  navigation_menu: Navigation[];
};

type ResolvedNavigation = {
  main: PageReference | null;
  sub: PageReference[];
};

export default function NavigationItem({ navigation_menu }: NavigationProps) {
  const [resolvedMenu, setResolvedMenu] = useState<ResolvedNavigation[]>([]);

  useEffect(() => {
    const resolveNavigation = async () => {
      const resolved = await Promise.all(
        navigation_menu.map(async (item) => {
          const { navigation_link, sub_navigation } = item.navigation;

          let main: PageReference | null = null;
          let sub: PageReference[] = [];

          // Resolve main nav link
          const mainRef = navigation_link?.[0];
          if (mainRef?._content_type_uid && mainRef?.uid) {
            try {
              const mainEntry = await getEntryByUid(
                mainRef._content_type_uid,
                mainRef.uid
              );
              main = {
                title: mainEntry.title,
                url: mainEntry.url,
              };
            } catch (err) {
              console.error("Error resolving main nav", err);
            }
          }

          // Resolve sub nav links
          const subResolved = await Promise.all(
            sub_navigation.map(async (ref) => {
              if (ref?._content_type_uid && ref?.uid) {
                try {
                  const entry = await getEntryByUid(
                    ref._content_type_uid,
                    ref.uid
                  );
                  return {
                    title: entry.title,
                    url: entry.url,
                  };
                } catch (err) {
                  console.error("Error resolving sub nav", err);
                }
              }
              return null;
            })
          );

          sub = subResolved.filter(Boolean) as PageReference[];

          return { main, sub };
        })
      );

      setResolvedMenu(resolved);
    };

    resolveNavigation();
  }, [navigation_menu]);

  if (!resolvedMenu.length) return null;

  return (
    <>
      {resolvedMenu.map((nav, index) => (
        <div key={index}>
          {nav.main && (
            <Link href={nav.main.url} className="text-white block mb-2">
              {nav.main.title}
            </Link>
          )}
          {nav.sub?.length > 0 && (
            <ul className="">
              {nav.sub.map((subItem, idx) => (
                <li key={idx} className="last:border-none">
                  <Link
                    className="block p-2 text-black lg:px-10 lg:py-4"
                    href={subItem.url}
                  >
                    {subItem.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </>
  );
}
