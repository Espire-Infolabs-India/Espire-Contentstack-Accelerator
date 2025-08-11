import React, { ReactNode, useState, useEffect } from "react";
import { Page } from "../model/page.model";
import Header from "./header";
import Footer from "./footer";
import Script from "next/script";

import { Poppins } from "next/font/google";
import { SEOProps } from "../model/common.model";
import SEO from "./seo";
export const PoppinFont = Poppins({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-Poppins",
});

type Props = {
  children?: ReactNode;
  page: Page;
  header;
  footer;
  entries?: Page[];
  seo: SEOProps;
};

export default function Layout({ children, page, header, footer, seo }: Props) {
  return (
    <>
      <SEO data={seo} />
      <Script
        src="https://web.cmp.usercentrics.eu/modules/autoblocker.js"
        strategy={"beforeInteractive"}
      ></Script>
      <Script
        id="usercentrics-cmp"
        src="https://web.cmp.usercentrics.eu/ui/loader.js"
        data-settings-id="WsB9MfwJE5J5uE"
        strategy={"beforeInteractive"}
      ></Script>
      <div className={`${PoppinFont.variable} font-poppin`}>
        <Header data={header} />
        {children}
        <Footer data={footer} />
      </div>
    </>
  );
}
