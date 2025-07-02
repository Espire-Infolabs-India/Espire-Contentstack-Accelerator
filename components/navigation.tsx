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
    <nav className="bg-[#1d3973] px-4 py-2">
      <ul className="flex justify-end gap-6 items-center text-white text-sm font-medium">
        {resolvedMenu.map((nav, index) => (
          <li key={index} className="relative group">
            {nav.menu && (
              <Link
                href={nav.menu.url}
                className="px-3 py-2 block group-hover:bg-white group-hover:text-black rounded-md transition-all duration-150"
              >
                {nav.menu.title}
              </Link>
            )}

            {/* Dropdown menu */}
            {nav.childMenu?.length > 0 && (
              <ul className="absolute left-0 mt-2 hidden group-hover:block bg-white text-black shadow-lg rounded-md py-2 min-w-[180px] z-50">
                {nav.childMenu.map((subItem, idx) => (
                  <li key={idx}>
                    <Link
                      href={subItem.url}
                      className="block px-4 py-2 hover:bg-gray-100 text-sm whitespace-nowrap"
                    >
                      {subItem.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
