import React, { ReactNode, useState, useEffect } from "react";
import { Page } from "../model/page.model";
import Header from "./header";
import Footer from "./footer";

type Props = {
  children?: ReactNode;
  page: Page;
  header;
  footer;
  entries: Page[];
};

export default function Layout({ children, page, header, footer, entries }: Props) {
  let jsonPreview = {};
  if (page) jsonPreview["page"] = page;

  return (
    <>
      <Header data={header} />
      {children}
      <Footer data={footer} />
    </>
  );
}
