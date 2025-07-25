import React, { useState, useEffect } from "react";
import CTA from "./cta";
import { HeroBanner } from "../model/component-props/hero-banner.model";
import Head from "next/head";
import parse from "html-react-parser";
export default function HeroBannerComponent(hero_banner: HeroBanner) {
  const [alignmentPosition, setAlignmentPosition] = useState("");
 
  // const numberslides = hero_banner?.key > 0 ? 'px-10' : '';
  useEffect(() => {
    if (hero_banner?.content_alignment === "Left") {
      setAlignmentPosition("justify-start text-left");
    } if (hero_banner?.content_alignment === "Right") {
      setAlignmentPosition("justify-end text-right");
    } if (hero_banner?.content_alignment === "Center") {
      setAlignmentPosition("justify-center text-center");
    }
  }, [hero_banner?.content_alignment]);

  return (
    <section className="relative w-full bg-black overflow-hidden">
      {hero_banner?.banner_image && (
        <Head>
          <link
            rel="preload"
            as="image"
            href={hero_banner?.banner_image.url}
            type="image/webp"
          />
        </Head>
      )}

      {hero_banner?.banner_image && (
        <img
          src={hero_banner?.banner_image?.url}
          alt={hero_banner?.banner_image?.title}
          className="object-cover w-full h-96"
          width={1920}
          height={720}
          loading="eager"
        />
      )}

      <div
        className={`absolute inset-0 bg-black bg-opacity-60 flex items-center px-4 md:px-0 z-10`}
      >
        <div
          className={`container m-auto flex flex-col ${alignmentPosition} text-white`}
        >
          <h2 className="mb-4 text-2xl sm:text-4xl font-semibold">
            {hero_banner?.banner_title}
          </h2>
          {hero_banner?.banner_description && (
            <div className="mb-6 text-lg sm:text-xl font-semibold">
              {parse(hero_banner?.banner_description)}
            </div>
          )}

          <CTA cta={hero_banner?.call_to_action} />
        </div>
      </div>
    </section>
  );
}
