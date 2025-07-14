import React from "react";
import CTA from "./cta";
import { HeroBanner } from "../model/component-props/hero-banner.model";
import Head from "next/head";
import parse from "html-react-parser";
export default function HeroBannerComponent(hero_banner: HeroBanner) {
  const cloudinaryImage =
    Array.isArray(hero_banner?.images) && hero_banner?.images?.length > 0
      ? hero_banner?.images[0]
      : !Array.isArray(hero_banner?.images) && hero_banner?.images?.secure_url
      ? hero_banner?.images
      : null;

  const finalImageUrl =
    cloudinaryImage?.secure_url || hero_banner?.banner_image?.url;
  const finalImageAlt =
    cloudinaryImage?.public_id ||
    hero_banner?.banner_image?.title ||
    "Hero Banner";
  return (
    <section className="relative w-full bg-black overflow-hidden">
      <Head>
        <link rel="preload" as="image" href={finalImageUrl} type="image/webp" />
      </Head>

      <img
        src={finalImageUrl}
        alt={finalImageAlt}
        className="object-cover w-full h-96"
        width={1920}
        height={720}
        loading="eager"
      />

      <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center px-4 md:px-0 text-center">
        <div className="text-white z-10 max-w-3xl">
          <h2 className="mb-4 text-2xl sm:text-4xl font-semibold">
            {hero_banner?.banner_title}
          </h2>
          {hero_banner?.banner_description && (
            <div className="mb-6 text-lg sm:text-xl font-semibold px-5">
              {parse(hero_banner?.banner_description)}
            </div>
          )}

          <CTA cta={hero_banner?.call_to_action} />
        </div>
      </div>
    </section>
  );
}
