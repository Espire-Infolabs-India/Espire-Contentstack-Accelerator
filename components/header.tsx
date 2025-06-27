import { useEffect, useState } from "react";
import { getEntryByUid } from "../contentstack-sdk";
import NavigationItem from "../components/navigationitem";
import LinkList from "./linklist";
import Link from "next/link";
import Image from "next/image";
import SearchBox from "./searchbox";
import HumbargarBG from "../public/menu-mobile.svg";

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
  sub_links?: SubLink[];
  reference?: SubLink[];
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

export default function Header({ data }: { data?: HeaderContentType }) {
  const [primaryNavItems, setPrimaryNavItems] = useState<NavigationEntry[]>([]);
  const [secondaryNavItems, setSecondaryNavItems] = useState<NavigationEntry[]>(
    []
  );
  const [ActiveValue, setActiveValue] = useState(false);
  const HumbargarOpen = () => {
    setActiveValue(true);
  };

  const HumbargarClose = () => {
    setActiveValue(false);
  };
  useEffect(() => {
    if (!data) return;

    const fetchNavigation = async () => {
      if (data.primary_navigation?.length) {
        const navItems = await Promise.all(
          data.primary_navigation.map(async (ref) => {
            const navItem = await getEntryByUid(ref._content_type_uid, ref.uid);

            if (Array.isArray(navItem.sub_links)) {
              navItem.sub_links = await Promise.all(
                navItem.sub_links.map(async (sub: any) =>
                  sub.uid && sub._content_type_uid
                    ? await getEntryByUid(sub._content_type_uid, sub.uid)
                    : sub
                )
              );
            }

            return navItem;
          })
        );
        setPrimaryNavItems(navItems.filter(Boolean));
      }

      if (data.secondary_navigation?.length) {
        const resolvedSecondary = await Promise.all(
          data.secondary_navigation.map(async (ref) => {
            const navItem = (await getEntryByUid(
              ref._content_type_uid,
              ref.uid
            )) as NavigationEntry;

            if (Array.isArray(navItem.reference)) {
              navItem.reference = await Promise.all(
                navItem.reference.map(async (sub: any) =>
                  sub.uid && sub._content_type_uid
                    ? await getEntryByUid(sub._content_type_uid, sub.uid)
                    : sub
                )
              );
            }

            return navItem;
          })
        );

        setSecondaryNavItems(resolvedSecondary.filter(Boolean));
      }
    };

    fetchNavigation();
  }, [data]);

  if (!data) return null;

  return (
    <div className="header-bg">
      <header className="pt-4 pl-2 pr-2 pb-2 container m-auto">
        <div className="flex justify-center lg:block">
          <div className="hidden lg:flex items-center lg:justify-end mb-1">
            <div className="flex items-center gap-6 header-menu-font-size">
              {secondaryNavItems.map((item) => (
                <LinkList
                  key={item.uid}
                  title={item.title}
                  links={item.reference as SubLink[]}
                />
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between">
            {data.logo?.url && (
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
                />
              </Link>
            )}
            <div className="flex items-center justify-evenly gap-8">
              <SearchBox />
              <nav className="hidden relative lg:block header-menu-font-size top-menu">
                <ul className="flex [&_a]:px-6">
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

              <div className="flex lg:hidden relative">
                {/* <Button onClick={HumbargarOpen}>
                  <Image
                    src={HumbargarBG}
                    className="w-[20] h-[20]"
                    alt="Menu Icon"
                  />
                </Button> */}
                {ActiveValue == true ? (
                  <div className="bg-[var(--royalblue)] w-full h-full shadow fixed top-0 right-0 z-30 p-4 overflow-y-auto">
                    <div className="flex justify-end">
                      {/* <Button onClick={HumbargarClose}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="size-8 text-white"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6 18 18 6M6 6l12 12"
                          />
                        </svg>
                      </Button> */}
                    </div>
                    <ul className="flex flex-col">
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
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
