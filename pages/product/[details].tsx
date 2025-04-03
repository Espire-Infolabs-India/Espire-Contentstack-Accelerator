import { useRouter } from "next/router";
import Image from "next/image";
import ProductCrousel from "../../components/product-detial-crousal";
import { Button, Box } from "@mui/material";
import { WidthFull } from "@mui/icons-material";
import AccordionExpandDefault from "../../components/accordion-expand-default";
import FeaturesAndBenefits from "../../components/features-and-benefits";
import ProductSelector from "../../components/product-selector";
export default function Details({ params }: any) {
  const router = useRouter();
  const { details } = router.query;

  const DetailData = [
    {
      producteyes: "BE19000 WiFi Router (RS700S)",
      title: "Nighthawk WiFi 7 Router, 19Gbps",
      dis: "The most powerful & advanced Nighthawk router ever. Unrivaled WiFi 7 speeds up to 19Gbps for real-timing gaming, 4K/8K streaming, UHD video conferencing, and AR/VR entertainment",
      img: "https://www.netgear.com/media/rs700s_prod_1_tcm148-148711.webp",
      URL: "RS700S",
    },
    {
      producteyes: "BE18000 WiFi Router (RS600)",
      title: "Nighthawk WiFi 7 Router RS600, 18Gbps",
      dis: "Enhanced WiFi performance for the latest devices. The RS600 provides unrivaled WiFi 7 speeds up to 18Gbps for real-time gaming, 4K/8K streaming, UHD video conferencing, and AR/VR entertainment​",
      img: "https://www.netgear.com/media/RS600_G1_779x536_tcm148-161817.webp",
      URL: "RS600",
    },
    {
      producteyes: "BE27000 Mesh WiFi System (RBE973SB) ",
      title: "Orbi 970 Series Quad-band WiFi 7 Mesh 3-Pack, Black Edition",
      dis: "Our most powerful and advanced Orbi unleashes up to 27Gbps for unparalleled performance and coverage for your whole home​",
      img: "https://www.netgear.com/media/_hero_banner_15052024_tcm148-152227.webp",
      URL: "RBE973SB",
    },
  ];

  const filterData = DetailData.filter((item) => item.URL == details);
  const { title, producteyes, img, dis } = filterData[0];
  console.log("pppp", filterData);

  const mockData = {
    title: <h2 className="text-2xl font-bold">WHAT'S INCLUDED</h2>,
    items: [
      {
        title: "WHAT'S INCLUDED",
        isOpen: true,
        content: {
          items: [
            {
              name: "Orbi Quad-band Router (RBE971B)",
              quantity: "One (1)",
            },
            {
              name: "Orbi Satellites (RBE970B)",
              quantity: "Two (2)",
            },
            {
              name: "2m Ethernet cable",
              quantity: "One (1)",
            },
            {
              name: "19v/3.16A power adapters",
              quantity: "Three (3)",
            },
            {
              name: "Quick Start Guide",
              quantity: "One (1)",
            },
          ],
        },
      },
      {
        title: "TECHNICAL DETAILS",
        content: {
          items: [
            {
              name: "Technical specification 1",
              quantity: "Value 1",
            },
            {
              name: "Technical specification 2",
              quantity: "Value 2",
            },
          ],
        },
      },
      {
        title: "NETWORK SECURITY",
        content: {
          items: [
            {
              name: "Security feature 1",
              quantity: "Description 1",
            },
            {
              name: "Security feature 2",
              quantity: "Description 2",
            },
          ],
        },
      },
    ],
    onClose: () => console.log("Close clicked"),
  };

  const featureData = {
    heading: "Features and benefits",
    features: [
      {
        title: "Up to 27Gbps speed",
        description:
          "Speeds up to 27Gbps† for unparalleled performance and coverage for your whole home, from the front door to the back garden and the basement to the loft",
        isNew: true,
      },
      {
        title: "Quad-band Technology",
        description:
          "Exclusive, patented Quad-Band technology with Enhanced Dedicated Backhaul ensures WiFi stays fast across all devices simultaneously",
        isNew: true,
      },
      {
        title: "10Gig Internet Port",
        description:
          "Whether multi-gig cable or fiber, get the fastest speeds available today and tomorrow with a 10 Gig internet port",
        isNew: true,
      },
      {
        title: "8k Streaming, Gaming and More",
        description:
          "From 8K streaming to video conferencing, gaming, VR, and more, Orbi ensures your family can accomplish it all at once",
      },
      {
        title: "360° WiFi Coverage",
        description:
          "Elegant, new design and high-performance antennas provide exceptional 360° WiFi coverage across every corner of your home, no matter the layout",
        isNew: true,
      },
      {
        title: "Secure and Private",
        description:
          "NETGEAR® Armor™ software provides an automatic shield of security for your WiFi and connected devices for real-time protection against hackers and added privacy with VPN. 1-year subscription included",
        isNew: true,
      },
      {
        title: "Reimagined Speed & Reliability",
        description:
          "10Gbps† & 2.5Gbps† Ethernet ports unlock unbeatable speed and reliability for wired connections and 10Gbps wired backhaul option",
        isNew: true,
      },
      {
        title: "Easy Set Up with Any Service Provider",
        description:
          "Simple to plug Orbi into your modem and set it up with the Orbi app",
      },
    ],
  };

  const SelectorData = {
    products: [
      {
        id: "970",
        title: "970 SERIES",
        description: "The most powerful & advanced Orbi. The ultimate WiFi experience.",
        image: "https://www.netgear.com/media/970_Series_new_black_v1_tcm148-152379.png",
        specs: {
          coverage: "Up to 10,000 sq. ft.",
          speed: "Up to 27 Gbps",
          technology: "WiFi 7 Quad-Band",
          devices: "Up to 200"
        },
        ctaButton: <a href="#"><button className="bg-black text-white font-bold py-3 px-8 rounded-full hover:bg-gray-800 transition-colors">SHOP NOW</button></a>
      },
      {
        id: "870",
        title: "870 SERIES",
        description: "Exceptional performance for highly-connected households",
        image: "https://www.netgear.com/media/873black_compare_tcm148-165425.webp",
        isNew: true,
        specs: {
          coverage: "Up to 9,000 sq. ft.",
          speed: "Up to 21 Gbps",
          technology: "WiFi 7 Tri-Band",
          devices: "Up to 150"
        },
        ctaButton: <a href="#"><button className="bg-black text-white font-bold py-3 px-8 rounded-full hover:bg-gray-800 transition-colors">SHOP NOW</button></a>
      },
      {
        id: "770",
        title: "770 SERIES",
        description: "Flawless connectivity to power work, streaming, gaming, & more",
        image: "https://downloads1.netgear.com/files/netgear/images/773_noFlag.webp",
        specs: {
          coverage: "Up to 8,000 sq. ft.",
          speed: "Up to 11 Gbps",
          technology: "WiFi 7 Tri-Band",
          devices: "Up to 100"
        },
        ctaButton: <a href="#"><button className="bg-black text-white font-bold py-3 px-8 rounded-full hover:bg-gray-800 transition-colors">SHOP NOW</button></a>
      }
    ]
  };

  return (
    <>
      <div className="flex container">
        <div className="p-4 basis-2/2">
          <ProductCrousel />
        </div>
        <div className="p-4 ml-6 basis-2/4">
          <p>{producteyes}</p>
          <h2 className="my-3">{title}</h2>
          <p className="text-2">{dis}</p>
          <Button
            className="mt-3 w-full p-2 text-2xl text-white"
            style={{ background: "#0044d6" }}
            variant="text"
          >
            ADD TO CART
          </Button>
        </div>
      </div>

      <Box component="section" className="bg-blue-900 relative mt-4">
        <Image
          width={1920}
          height={400}
          src={
            "https://www.netgear.com/media/rbke973s_a_-superior_class-v2_new_tcm148-152146.webp"
          }
          alt=""
          unoptimized
        />
        <div className="absolute flex flex-col h-full w-full justify-center items-center left-0 text-white top-0">
          <h2 className="text-4xl">A superior class of WiFi</h2>
          <p className="text-white">
            Orbi 970 Series uniquely unlocks the extraordinary power of WiFi 7{" "}
            <br />
            for your whole home, delivering unprecedented WiFi speeds from the
            <br />
            front door to the back yard and the basement to the rooftop.
          </p>
        </div>
      </Box>

      <section className="w-full">
        <FeaturesAndBenefits {...featureData} />
      </section>

      <section className="w-full my-5">
        <ProductSelector {...SelectorData} />
      </section>

      <div className="container mt-5">
        <h2 className="text-3x1 mb-3">Product specifications</h2>
        <AccordionExpandDefault />
      </div>
    </>
  );
}
