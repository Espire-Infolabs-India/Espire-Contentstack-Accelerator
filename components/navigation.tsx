import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { HeaderEntryResponse } from "../typescript/header";
interface NavigationProps {
  entry: HeaderEntryResponse | null;
} 

export function getSiteName(): string {
  console.log("navigation getSiteName:", process.env.NEXT_PUBLIC_SITE_NAME);
   return process.env.NEXT_PUBLIC_SITE_NAME || "Site-1"; // Default for server-side or fallback
}

const Navigation: React.FC<HeaderEntryResponse> = (
  entry: HeaderEntryResponse
) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [localeDropdownOpen, setLocaleDropdownOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMenuToggle = (menuName: string) => {
    if (isMobile) {
      setActiveMenu(activeMenu === menuName ? null : menuName);
    }
  };

  const handleMouseEnter = (menuName: string) => {
    if (!isMobile) {
      setActiveMenu(menuName);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setActiveMenu(null);
    }
  };

  return (
    <div className="w-full">
      {/* Top Banner */}
      {/* <div className="bg-black text-white py-2 font-medium px-4 flex items-center justify-center relative">
        <button className="absolute left-4 text-white" aria-label="Previous offer">
         
        </button>
        <div className="text-center">{fields.topBanner.text}</div>
        <button className="absolute right-4 text-white" aria-label="Next offer">
          {fields.topBanner.nextButton}
        </button>
      </div> */}

      {/* Main Navigation */}

      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <div className="mr-8">
              <Link href={"/product"}>
                {" "}
                <Image
                  height={20}
                  width={140}
                  src={entry?.logo?.url || ""}
                  alt={entry?.logo?.title || ""}
                />
              </Link>
            </div>

            {/* Main Nav Links */}
            <div className="hidden lg:flex flex-grow">
              {entry?.navigation_links.map((link, index) => (
                <div
                  key={index}
                  className="relative group mr-8"
                  // onMouseEnter={() => handleMouseEnter(link?.text || '')}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    href={link?.link_url}
                    className="font-medium text-gray-800 hover:text-gray-600 pb-5 uppercase"
                    // onClick={(e) => {
                    //   if (isMobile && fields.megaMenus[link.text]) {
                    //     e.preventDefault();
                    //     handleMenuToggle(link.text);
                    //   }
                    // }}
                  >
                    {link?.link_text}
                  </Link>
                </div>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                className="text-gray-800"
                onClick={() => setActiveMenu(activeMenu ? null : "mobile")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              </button>
            </div>

            {/* Right Side Icons */}
            {/* <div className="flex items-center space-x-4">
              <Link href={''}>{fields.countrySelector}</Link>
              <Link href={''}>{fields.searchButton}</Link>
              <Link href={''}>{fields.helpButton}</Link>
              <Link href={''}>{fields.accountButton}</Link>
              <Link href={''}>{fields.cartButton}</Link>
            </div> */}
 



{getSiteName() === 'Site-1' ? (null):(<div className="relative inline-block text-left">
  <div>
    <button
      type="button"
      className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
      onClick={() => setLocaleDropdownOpen(!localeDropdownOpen)}
    >
      Language
      <svg
        className="-mr-1 ml-2 h-5 w-5"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.25 8.27a.75.75 0 01-.02-1.06z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  </div>

  {localeDropdownOpen && (
    <div className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
      <div className="py-1">
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a
          href="/"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          English
        </a>
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a
          href="/de-de"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          Dutch
        </a>
      </div>
    </div>
  )}
</div>)}

          </div>

          {/* Mobile Navigation */}
          <div
            className={`lg:hidden ${
              activeMenu === "mobile" ? "block" : "hidden"
            }`}
          >
            <div className="py-2">
              {entry?.navigation_links.map((link, index) => (
                <div key={index} className="py-2">
                  <button
                    className="w-full text-left font-medium text-gray-800 flex justify-between items-center"
                    onClick={() => handleMenuToggle(link.link_text)}
                  >
                    {link.link_text}
                    {/* {fields.megaMenus[link.text] && (
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform ${activeMenu === link.text ? 'rotate-180' : ''}`}>
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    )} */}
                  </button>

                  {/* {fields.megaMenus[link.text] && activeMenu === link.text && (
                    <div className="mt-2 pl-4 border-l-2 border-gray-200">
                      {fields.megaMenus[link.text].map((category, catIndex) => (
                        <div key={catIndex} className="py-2">
                          <div className="font-medium text-gray-700 mb-1">{category.title}</div>
                          <div className="space-y-1">
                            {category.links.map((link, linkIndex) => (
                              <div key={linkIndex} className="text-gray-600 hover:text-gray-800">
                                {link}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )} */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mega Menu Desktop */}
      <div
        className={`absolute left-0 w-full bg-gray-100 shadow-lg z-50 transition-all duration-300 ${
          activeMenu && !isMobile
            ? "opacity-100 visible"
            : "opacity-0 invisible"
        }`}
        onMouseEnter={() =>
          !isMobile && activeMenu && setActiveMenu(activeMenu)
        }
        onMouseLeave={() => !isMobile && setActiveMenu(null)}
      >
        {" "}
        dd
        {/* {activeMenu && fields.megaMenus[activeMenu] && (
          <div className="container mx-auto px-4 py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {fields.megaMenus[activeMenu].map((category, index) => (
                <div key={index} className="mb-4">
                  <div className="font-medium text-gray-800 mb-3 border-l-4 border-blue-500 pl-2">
                    {category.title}
                  </div>
                  <ul className="space-y-2">
                    {category.links.map((link, linkIndex) => (
                      <li key={linkIndex} className="text-gray-700 hover:text-gray-900">
                        {link}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default Navigation;
