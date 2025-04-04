import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import parse from 'html-react-parser';
import Tooltip from './tool-tip';
import { onEntryChange } from '../contentstack-sdk';
import { getHeaderRes } from '../helper';
import Skeleton from 'react-loading-skeleton';
import { HeaderProps, Entry, NavLinks } from "../typescript/layout";
import Navigation from './navigation';
// import    Navigation  from './navigation';

export default function Header({ header, entries }: {header: HeaderProps, entries: Entry}) {

  const router = useRouter();
  const [getHeader, setHeader] = useState(header);

  function buildNavigation(ent: Entry, hd: HeaderProps) {
    let newHeader={...hd};
    if (ent.length!== newHeader.navigation_menu.length) {
          ent.forEach((entry) => {
            const hFound = newHeader?.navigation_menu.find(
              (navLink: NavLinks) => navLink.label === entry.title
            );
            if (!hFound) {
              newHeader.navigation_menu?.push({
                label: entry.title,
                page_reference: [
                  { title: entry.title, url: entry.url, $: entry.$ },
                ],
                $:{}
              });
            }
          });
    }
    return newHeader
  }

  async function fetchData() {
    try {
      if (header && entries) {
      const headerRes = await getHeaderRes();
      const newHeader = buildNavigation(entries,headerRes)
      setHeader(newHeader);
    }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (header && entries) {
      onEntryChange(() => fetchData());
    }
  }, [header]);
  const headerData = getHeader ? getHeader : undefined;
  const mockData = {
    fields: {
      logo: <img src="https://stagesupport.netgear.com/support/cloudimage/1/11/409" alt="NETGEAR" width="180" />,
      topBanner: {
        text: <span>LIMITED TIME OFFERS <span className="text-blue-400">&gt;&gt;</span></span>,
        prevButton: <span>&lt;</span>,
        nextButton: <span>&gt;</span>
      },
      mainNavLinks: [
        { text: "HOME SOLUTIONS", url: "/product" },
        { text: "BUSINESS SOLUTIONS", url: "#" },
        { text: "AV SOLUTIONS", url: "#" },
        { text: "SUPPORT", url: "#" },
        { text: "SHOP OFFERS", url: "#" }
      ],
      megaMenus: {
        "HOME SOLUTIONS": [
          {
            title: <span>Home WiFi</span>,
            links: [
              <a key={'1'} href="#">Whole Home Mesh WiFi</a>,
              <a key={'2'} href="#">WiFi Routers</a>,
              <a key={'3'} href="#">Cable Modems</a>,
              <a key={'4'} href="#">Cable Modem Routers</a>,
              <a key={'5'} href="#">WiFi Range Extenders</a>,
              <a key={'6'} href="#">USB WiFi Adapters</a>,
              <a key={'7'} href="#">Gaming Routers</a>,
              <a key={'8'} href="#">Accessories</a>
            ]
          },
          {
            title: <span>Mobile WiFi</span>,
            links: [
              <a href="#" key={'mw1'}>4G/5G Mobile Hotspots</a>,
              <a href="#" key={'mw2'}>4G/5G Mobile WiFi Routers</a>,
              <a href="#" key={'mw3'}>4G LTE Modems</a>
            ]
          },
          {
            title: <span>Digital Frame</span>,
            links: [
              <a key={'df1'} href="#">Meural Canvas II</a>,
              <a key={'df2'} href="#">Meural WiFi Photo Frame</a>
            ]
          },
          {
            title: <span>Wired Networking</span>,
            links: [
              <a key={'wn1'} href="#">Switches</a>,
              <a key={'wn2'} href="#">Powerline</a>
            ]
          }
        ],
        "SHOP OFFERS": [
          {
            title: <span>SHOP OFFERS</span>,
            links: [
              <a key={'sf1'} href="#">Current Promotions</a>,
              <a key={'sf2'} href="#">Clearance Items</a>
            ]
          }
        ],
        "BUSINESS SOLUTIONS": [
          {
            title: <span>Business Networking</span>,
            links: [
              <a key={'b1'} href="#">Switches</a>,
              <a key={'b2'} href="#">Wireless Access Points</a>,
              <a key={'b3'} href="#">Routers</a>
            ]
          }
        ],
        "AV SOLUTIONS": [
          {
            title: <span>AV Over IP</span>,
            links: [
              <a key={'av1'} href="#">Switches</a>,
              <a key={'av2'} href="#">Encoders & Decoders</a>
            ]
          }
        ],
        "SUPPORT": [
          {
            title: <span>NETGEAR Armor</span>,
            links: [
              <a key={'n1'} href="#">NETGEAR Armor</a>
            ]
          },
          {
            title: <span>NETGEAR ProSupport</span>,
            links: [
              <a key={'ng1'} href="#">NETGEAR ProSupport</a>
            ]
          },
          {
            title: <span>NETGEAR Smart Parental Controls</span>,
            links: [
              <a key={'ns1'} href="#">NETGEAR Smart Parental Controls</a>
            ]
          }
        ]
      },
      countrySelector: <img src="https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.11.0/flags/4x3/us.svg" alt="US" width="24" height="16" />,
      searchButton: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      ),
      helpButton: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
      ),
      accountButton: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      ),
      cartButton: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
      )
    }
  }
  return (
    <header className='header'>
      <div className='note-div hidden' >
        {headerData?.notification_bar.show_announcement ? (
          typeof headerData.notification_bar.announcement_text === 'string' && (
            <div {...headerData.notification_bar.$?.announcement_text as {}}>
              {parse(headerData.notification_bar.announcement_text)}
            </div>
          )
        ) : (
          <Skeleton />
        )}
      </div>
      <Navigation fields={mockData?.fields} />
      {/* <Navigation /> */}
      {/* <Navigation /> */}
      {/* <div className='max-width header-div'>
        <div className='wrapper-logo'>
          {headerData ? (
            (<Link href='/' className='logo-tag' title='Contentstack'>

              <img
                className='logo'
                src={headerData.logo.url}
                alt={headerData.title}
                title={headerData.title}
                {...headerData.logo.$?.url as {}}
              />

            </Link>)
          ) : (
            <Skeleton width={150} />
          )}
        </div>
        <input className='menu-btn' type='checkbox' id='menu-btn' />
        <label className='menu-icon' htmlFor='menu-btn'>
          <span className='navicon' />
        </label>
        <nav className='menu'>
          <ul className='nav-ul header-ul'>
            {headerData ? (
              headerData.navigation_menu.map((list) => {
                const className =
                  router.asPath === list.page_reference[0].url ? 'active' : '';
                return (
                  <li
                    key={list.label}
                    className='nav-li'
                    {...list.page_reference[0].$?.url as {}}
                  >
                    <Link href={list.page_reference[0].url} className={className}>
                      {list.label}
                    </Link>
                  </li>
                );
              })
            ) : (
              <Skeleton width={300} />
            )}
          </ul>
        </nav>

        <div className='json-preview'>
          <Tooltip content='JSON Preview' direction='top' dynamic={false} delay={200} status={0}>
            <span data-bs-toggle='modal' data-bs-target='#staticBackdrop'>
              <img src='/json.svg' alt='JSON Preview icon' />
            </span>
          </Tooltip>
        </div>
      </div> */}
    </header>
  );
}