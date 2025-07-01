import React from "react";
import Link from "next/link";
import parse from "html-react-parser";

import CTA from "./cta";
import { HeroBanner } from "../model/component-props/hero-banner.model";

export default function HeroBannerComponent(hero_banner: HeroBanner) {
  return (
    <div
      className="hero-banner"
      style={{
        background: hero_banner?.background_color
          ? hero_banner.background_color
          : "",
      }}
    >
      <div
        className="home-content"
        style={{ color: hero_banner?.text_color || "#222222" }}
      >
        {hero_banner?.banner_title && (
          <h1 className="hero-title">{hero_banner.banner_title}</h1>
        )}
        {hero_banner?.banner_description && (
          <div
            className="hero-description"
            style={{ color: hero_banner.text_color || "#222222" }}
          >
            {parse(hero_banner?.banner_description)}
          </div>
        )}
      </div>
      {hero_banner?.banner_image && (
        <img
          alt={hero_banner.banner_image.filename}
          src={hero_banner.banner_image.url}
        />
      )}
    </div>
  );
}
