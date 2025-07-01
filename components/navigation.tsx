import Link from "next/link";
import React from "react";
import {
  NavigationMenu,
  NavigationProps,
} from "../model/component-props/navigation-model";

export default function Navigation({ navigation_menu }: NavigationProps) {
  const resolvedMenu: NavigationMenu[] = navigation_menu.map((item) => {
    const menu = item.navigation.navigation_link?.[0] || null;
    const childMenu = item.navigation.sub_navigation || [];
    return { menu, childMenu };
  });

  if (!resolvedMenu.length) return null;

  return (
    <>
      {resolvedMenu.map((nav, index) => (
        <div key={index}>
          {nav.menu && (
            <Link href={nav.menu.url} className="text-white block mb-2">
              {nav.menu.title}
            </Link>
          )}
          {nav.childMenu?.length > 0 && (
            <ul className="">
              {nav.childMenu.map((subItem, idx) => (
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
