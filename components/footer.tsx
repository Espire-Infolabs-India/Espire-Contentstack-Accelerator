import React, { useState, useEffect } from 'react';
import { getFooteresponse } from '../helper';
import { FooterLink, FooterResponse } from '../typescript/footer';
import { useRouter } from 'next/router';

const FOOTER_CONFIG = [
  { label: 'footer', entryUid: 'blt528d591e3b8eb3ff' },
  { label: 'alerts', entryUid: 'bltc1d798ac5f37648e' },
  { label: 'resources', entryUid: 'blt5ebebf807b224fd3' },
  { label: 'myNetgear', entryUid: 'bltc45145212e1b37be' }
];

const contentTypeUid = 'footer-netgear'; // assuming same for all

export default function Footer() {

  const [footer, setFooter] = useState<FooterResponse | null>(null);
  const [alerts, setAlerts] = useState<FooterResponse | null>(null);
  const [resources, setResources] = useState<FooterResponse | null>(null);
  const [myNetgear, setMyNetgear] = useState<FooterResponse | null>(null);

  const router = useRouter();
  

  useEffect(() => {
    async function fetchFooterData() {
      const contentTypeUids = FOOTER_CONFIG.map(() => contentTypeUid);
      const entryUids = FOOTER_CONFIG.map(item => item.entryUid);
      try {
        const responses = await getFooteresponse(contentTypeUids, entryUids,  router?.locale);
        if (!responses || responses.length !== FOOTER_CONFIG.length) {
          console.error("Unexpected response from getFooteresponse", responses);
          return;
        }
        responses.forEach((response, index) => {
          const label = FOOTER_CONFIG[index].label;
          switch (label) {
            case 'footer':
              setFooter(response);
              break;
            case 'alerts':
              setAlerts(response);
              break;
            case 'resources':
              setResources(response);
              break;
            case 'myNetgear':
              setMyNetgear(response);
              break;
            default:
              console.warn(`Unknown label: ${label}`);
          }
        });
      } catch (error) {
        console.error("Error fetching footer data:", error);
      }
    }

    fetchFooterData();
  }, []);

  return (

    <footer className="bg-gray-50 border-t border-gray-200 text-sm text-gray-700">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold mb-3">{resources?.entry?.footer_description}</h3>
          <ul className="space-y-2">
            {
              resources?.entry?.footer_links?.map((link: FooterLink) => (
                <li key={link?.label}> <a  href={link?.url}>
                  {link?.label}
                </a>
                </li>
              ))
            }
          </ul>
        </div>

        {/* Alerts */}
        <div>
          <h3 className="text-lg font-semibold mb-3">{alerts?.entry?.footer_description}</h3>
          <ul className="space-y-3">
            {
              alerts?.entry?.footer_links?.map((link: FooterLink) => (
                <li className="flex items-start gap-2" key={link?.label}> <a  href={link?.url}>
                  <span className="text-red-500">❗</span> {link?.label}
                </a>
                </li>
              ))
            }
          </ul>
        </div>

        {/* MyNETGEAR */}
        <div>
          <h3 className="text-lg font-semibold mb-3">{myNetgear?.entry?.footer_description}</h3>
          <div className="flex flex-col space-y-3">
            {
              myNetgear?.entry?.footer_links?.map((link: FooterLink) => (
                <a className="bg-white shadow rounded px-4 py-2 flex items-center gap-2 hover:bg-gray-100" key={link?.label} href={link?.url}>
                  {link?.label}
                </a>
              ))
            }
          </div>
        </div>
      </div>

      {/* Bottom Bar */}

      {
        footer && (
          <div className="border-t border-gray-200 mt-10 py-4 px-4 text-center text-xs text-gray-500">
            <div className="flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto">
              <div className="mb-2 sm:mb-0">
                <strong className="text-gray-700"> {footer?.entry?.footer_description} {footer?.entry?.footer_copyright} </strong> &nbsp;
                <span dangerouslySetInnerHTML={{ __html: footer?.entry?.extra_field || '' }} />
              </div>

              <div className="flex items-center gap-2 mt-2 sm:mt-0">
                {/* Social icons – swap for actual icons as needed */}
                {
                  footer?.entry?.footer_links?.map((link: FooterLink) => (
                    <a key={link?.label} href={link?.url} className="bg-black text-white px-2 py-1 rounded hover:text-gray-700">
                      <img src={link?.icon?.url} alt={link?.label} className="w-5 h-5" />
                    </a>
                  ))
                }
                {/* <span className="bg-black text-white px-2 py-1 rounded">f</span>
              <span className="bg-black text-white px-2 py-1 rounded">X</span>
              <span className="bg-black text-white px-2 py-1 rounded">▶</span>
              <span className="bg-black text-white px-2 py-1 rounded">📷</span> */}
                <select className="ml-2 px-2 py-1 border rounded text-sm">
                  <option value=""> United States (English)</option>
                </select>
              </div>
            </div>
          </div>
        )
      }

    </footer>
  )
}