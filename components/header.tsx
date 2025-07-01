import { useEffect, useState } from "react";
import NavigationItem from "./navigation";
import LinkList from "./link-list";
import Link from "next/link";
import Image from "next/image";
import SearchBox from "./searchbox";
import LanguageSelector from "./languageselector";
import { HeaderContentType } from "../model/component-props/header.model";
import Navigation from "./navigation";

export default function Header({ data }: { data?: HeaderContentType }) {
  const [ActiveValue, setActiveValue] = useState(false);
  const HumbargarOpen = () => setActiveValue(true);
  const HumbargarClose = () => setActiveValue(false);

  if (!data) return null;

  return (
    <div className="header-bg">
      <header className="pt-4 pl-2 pr-2 pb-2 container m-auto">
        <div className="flex justify-center lg:block">
          {/* Quick Links */}
          <div className="hidden lg:flex items-center lg:justify-end mb-1">
            <div className="flex items-center gap-6 header-menu-font-size">
              <LinkList
                title={data?.quick_links?.title as string}
                links={data?.quick_links?.link_list || []}
              />
              <LanguageSelector />
            </div>
          </div>

          {/* Main Header */}
          <div className="flex items-center justify-between">
            {/* Logo */}
            {data?.logo?.url && (
              <Link href="/">
                <Image
                  src={
                    data.logo.url.startsWith("//")
                      ? `https:${data.logo.url}`
                      : data.logo.url
                  }
                  width={100}
                  height={70}
                  alt="Logo"
                  className="mr-4"
                  style={{ width: "auto", height: "auto" }}
                  priority // Only if it's in the header or above-the-fold
                />
              </Link>
            )}
            {/* Search + Navigation */}
            <div className="flex items-center justify-evenly gap-8">
              <SearchBox />
              <nav className="hidden relative lg:block header-menu-font-size top-menu">
                <ul className="flex [&_a]:px-6">
                  <Navigation navigation_menu={data?.navigation_menu} />
                </ul>
              </nav>
              {/* Mobile menu placeholder (not active) */}
              <div className="flex lg:hidden relative">
                {/* Add hamburger toggle logic here later if needed */}
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
