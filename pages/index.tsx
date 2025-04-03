import React, { useState, useEffect } from 'react';
import { onEntryChange } from '../contentstack-sdk';
import RenderComponents from '../components/render-components';
import { getPageRes } from '../helper';
import Skeleton from 'react-loading-skeleton';
import CaptionBanner from '../components/caption-banner';
import OneColImageWithCta from '../components/one-col-image-with-cta';
import ThumbnailCarousel from '../components/thumbnail-carousel';

import { Props, Context } from "../typescript/pages";

const slidesData = [
  {
    backgroundImage: <img src="https://www.netgear.com/media/splash-fullasset-orbi970-desktop-save300_tcm148-167764.webp" alt="Orbi WiFi 7" className="w-full h-full object-cover" />,
    title: "Experience the most powerful & advanced Orbi",
    description: "Save up to $300 on Orbi 970 Series Black Edition. NETGEAR exclusive.",
    primaryCta: <a href="#">SHOP ORBI 970</a>,
    secondaryCta: <a className='text-white' href="#">LEARN MORE</a>,
    badge: <div className="bg-blue-600 text-white inline-block py-2 px-4 font-bold">SAVE $300</div>
  }
];

const oneColImageWithCTAData = {
  backgroundImage: <img src="https://picsum.photos/800/500?random=1" alt="Network server rack with blue and purple cables" className="w-full h-full object-cover" />,
  title: "Business Networking Solutions",
  description: "Explore AV and IT solutions for commercial, residential, and broadcast applications",
  ctaButton: <a className='text-white' href="#">LEARN MORE</a>
};

const thumbnailCarouselData = {
    heading: "HOME WIFI SOLUTIONS",
    wifiSolutions: [
      {
        image: <img src="https://picsum.photos/400/300?random=1" alt="Mesh WiFi System" className="w-full h-full object-cover" />,
        title: "Mesh WiFi System",
        buttonText: <a href="#">SHOP NOW</a>
      },
      {
        image: <img src="https://picsum.photos/400/300?random=2" alt="Nighthawk WiFi Routers" className="w-full h-full object-cover" />,
        title: "Nighthawk WiFi Routers",
        buttonText: <a href="#">SHOP NOW</a>
      },
      {
        image: <img src="https://picsum.photos/400/300?random=3" alt="5G Mobile Routers" className="w-full h-full object-cover" />,
        title: "5G Mobile Routers",
        buttonText: <a href="#">SHOP NOW</a>
      },
      {
        image: <img src="https://picsum.photos/400/300?random=4" alt="Cable Modems" className="w-full h-full object-cover" />,
        title: "Cable Modems",
        buttonText: <a href="#">SHOP NOW</a>
      },
      {
        image: <img src="https://picsum.photos/400/300?random=5" alt="Limited time offers" className="w-full h-full object-cover" />,
        title: "Limited time offers",
        buttonText: <a href="#">SHOP DEALS</a>
      }
    ]
};

export default function Home(props: Props) {
  const { page, entryUrl } = props;
  const [getEntry, setEntry] = useState(page);
  
  async function fetchData() {
    try {
      const entryRes = await getPageRes(entryUrl);
      if (!entryRes) throw new Error('Status code 404');
      setEntry(entryRes);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    onEntryChange(() => fetchData());
  }, []);

  return getEntry ? (
    <>
      <CaptionBanner fields={{
        slides: slidesData
      }} />

      <OneColImageWithCta fields={oneColImageWithCTAData} />

      <ThumbnailCarousel fields={thumbnailCarouselData} />

      <RenderComponents
        pageComponents={getEntry.page_components}
        contentTypeUid='page'
        entryUid={getEntry.uid}
        locale={getEntry.locale}
      />
    </>
  ) : (
    <Skeleton count={3} height={300} />
  );
}

export async function getServerSideProps(context: Context) {
  try {
    const entryRes = await getPageRes(context.resolvedUrl);
    return {
      props: {
        entryUrl: context.resolvedUrl,
        page: entryRes,
      },
    };
  } catch (error) {
    return { notFound: true };
  }
}
