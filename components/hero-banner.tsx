import React from "react";
import Link from "next/link";
import { HeroBanner } from "../model/page.model";
import parse from "html-react-parser";
import { useReferenceEntry } from "../helper/getReferenceEntry";
import CTA from "./cta";
interface HeroProps {
  hero_banner: HeroBanner;
}

export default function HeroBannerComponent({ hero_banner }: HeroProps) {
  const referenceEntry = hero_banner?.cta[0];
  const {
    entry: linkedEntry,
    loading,
    error,
  } = useReferenceEntry(referenceEntry?._content_type_uid, referenceEntry?.uid);

  return (
    <div className="hero-banner1">
      <div className="home-content1">
        {hero_banner.banner_title && (
          <h1 className="hero-title" {...hero_banner?.$?.banner_title}>
            {hero_banner.banner_title}
          </h1>
        )}
        {hero_banner.banner_description ? (
          <div
            className="hero-description"
            style={{ color: "#222222" }}
            {...hero_banner.$?.banner_description}
          >
            {parse(hero_banner?.banner_description)}
          </div>
        ) : (
          ""
        )}
      </div>
      {hero_banner.banner_image ? (
        <div>
          <img
            alt={hero_banner.banner_image.filename}
            src={hero_banner.banner_image.url}
            {...hero_banner.banner_image.$?.url}
          />
        </div>
      ) : (
        ""
      )}
      <div>
        <CTA cta={linkedEntry} />
      </div>
    </div>
  );
}
