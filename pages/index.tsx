import React, { useState, useEffect } from 'react';
import { onEntryChange } from '../contentstack-sdk';
import RenderComponents from '../components/render-components';
import { getPageRes } from '../helper';
import Skeleton from 'react-loading-skeleton';
import CaptionBanner from '../components/caption-banner';
import OneColImageWithCta from '../components/one-col-image-with-cta';
import ThumbnailCarousel from '../components/thumbnail-carousel';
import TwoColImageCtaLogo from '../components/two-col-image-cta-logo';
import TwoColImageCta from '../components/two-col-image-cta';

import { Props, Context } from "../typescript/pages";
import { Description } from '@mui/icons-material';

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
        description: "",
        buttonText: <a href="#">SHOP NOW</a>
      },
      {
        image: <img src="https://picsum.photos/400/300?random=2" alt="Nighthawk WiFi Routers" className="w-full h-full object-cover" />,
        title: "Nighthawk WiFi Routers",
        description: "",
        buttonText: <a href="#">SHOP NOW</a>
      },
      {
        image: <img src="https://picsum.photos/400/300?random=3" alt="5G Mobile Routers" className="w-full h-full object-cover" />,
        title: "5G Mobile Routers",
        description: "",
        buttonText: <a href="#">SHOP NOW</a>
      },
      {
        image: <img src="https://picsum.photos/400/300?random=4" alt="Cable Modems" className="w-full h-full object-cover" />,
        title: "Cable Modems",
        description: "",
        buttonText: <a href="#">SHOP NOW</a>
      },
      {
        image: <img src="https://picsum.photos/400/300?random=5" alt="Limited time offers" className="w-full h-full object-cover" />,
        title: "Limited time offers",
        description: "",
        buttonText: <a href="#">SHOP DEALS</a>
      }
    ]
};

const thumbnailCarouselData2 = {
  heading: "BUSINESS SOLUTIONS",
  wifiSolutions: [
    {
      image: <img src="https://picsum.photos/400/300?random=1" alt="Mesh WiFi System" className="w-full h-full object-cover" />,
      title: "Access Points",
      description: "Fast, reliable WiFi connectivity, for busy office environments ",
      buttonText: <a href="#">SHOP NOW</a>
    },
    {
      image: <img src="https://picsum.photos/400/300?random=2" alt="Nighthawk WiFi Routers" className="w-full h-full object-cover" />,
      title: "ProAV Switches",
      description: "Engineered with out-of-the-box support for networked AV solutions",
      buttonText: <a href="#">SHOP NOW</a>
    },
    {
      image: <img src="https://picsum.photos/400/300?random=3" alt="5G Mobile Routers" className="w-full h-full object-cover" />,
      title: "Switches",
      description: "Powerful wired networking options to meet your business needs",
      buttonText: <a href="#">SHOP NOW</a>
    },
    {
      image: <img src="https://picsum.photos/400/300?random=4" alt="Cable Modems" className="w-full h-full object-cover" />,
      title: "Pro Routers",
      description: "Get high-speed, reliable routing with failover protection",
      buttonText: <a href="#">SHOP NOW</a>
    },
    {
      image: <img src="https://picsum.photos/400/300?random=5" alt="Limited time offers" className="w-full h-full object-cover" />,
      title: "All Business",
      description: "Shop our full range of business network solutions",
      buttonText: <a href="#">SHOP DEALS</a>
    }
  ]
};

const TwoColImageCtaLogoData = {
    leftColumn: {
      headline: "Take flawless 5G WiFi everywhere",
      description: "Save on the Nighthawk M6 Pro and get a free antenna for a limited time",
      ctaButton: <a href="#">SHOP M6 PRO</a>,
      backgroundImage: <img src="https://picsum.photos/800/600?random=1" alt="Nighthawk M6 Pro router on a surface" />,
      savingsTag: (
        <div className="bg-blue-500 text-white p-4 font-bold">
          <div>SAVE</div>
          <div className="text-3xl">$255</div>
        </div>
      )
    },
    rightColumn: {
      headline: "Unlock today's fastest cable internet speeds",
      description: "Our newest cable modems offer unreal download and upload speeds to power streaming, gaming, and so much more",
      ctaButton: <a href="#">SHOP CM3000</a>,
      backgroundImage: <img src="https://picsum.photos/800/600?random=2" alt="Cable modem in a home office setting" />
    }
};

const TwoColImageCtaData = {
    leftColumn: {
      logo: <img src="https://via.placeholder.com/120x40/000000/FFFFFF?text=ORBI" alt="Orbi Mesh Systems" />,
      title: "Elite whole-home mesh WiFi that's built for more",
      description: "Orbi mesh systems create a seamless WiFi network with consistent, high-speed performance for larger homes and spaces",
      primaryCta: <a href="#">SHOP ORBI 870</a>,
      secondaryCta: <a href="#">FIND YOUR ORBI</a>,
      productImage: <img src="https://picsum.photos/800/400?random=1" alt="Orbi Mesh Systems Products" />,
      productLabels: [
        {
          newLabel: "NEW",
          modelNumber: "870"
        },
        {
          modelNumber: "970"
        },
        {
          modelNumber: "770"
        }
      ]
    },
    rightColumn: {
      logo: <img src="https://via.placeholder.com/180x60/000000/FFFFFF?text=NIGHTHAWK" alt="Nighthawk Routers" />,
      title: "WiFi 7 power. Nighthawk performance.",
      description: "Every home deserves legendary WiFi performance. Now there's a Nighthawk router that's just right for you.",
      primaryCta: <a href="#">SHOP NOW</a>,
      secondaryCta: <a href="#">FIND YOUR ROUTER</a>,
      productImage: <img src="https://picsum.photos/800/400?random=2" alt="Nighthawk Router Products" />,
      productLabels: [
        {
          newLabel: "NEW",
          modelNumber: "RS500"
        },
        {
          modelNumber: "RS700S"
        },
        {
          newLabel: "NEW",
          modelNumber: "RS300"
        }
      ]
    }
};

const slidesData2 = [
  {
    backgroundImage: <img src="https://picsum.photos/1600/500?random=1" alt="Orbi WiFi 7" className="w-full h-full object-cover" />,
    title: "A connection is more than technology",
    description: "For nearly 30 years, millions of people have trusted NETGEAR to power their homes and businesses. See how we earn that trust every day.",
    primaryCta: null,
    secondaryCta: <a className='text-white' href="#">LEARN MORE</a>,
    badge: <div className="bg-blue-600 text-white inline-block py-2 px-4 font-bold">SAVE $300</div>
  }
];

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

      <TwoColImageCtaLogo fields={TwoColImageCtaLogoData} />

      <TwoColImageCta fields={TwoColImageCtaData} />

      <CaptionBanner fields={{
        slides: slidesData2
      }} />

      <ThumbnailCarousel fields={thumbnailCarouselData2} />

      {/* <RenderComponents
        pageComponents={getEntry.page_components}
        contentTypeUid='page'
        entryUid={getEntry.uid}
        locale={getEntry.locale}
      /> */}
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
