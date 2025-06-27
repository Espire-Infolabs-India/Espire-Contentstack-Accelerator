import React, { ReactNode, useState, useEffect } from "react";
import { Page } from "../model/page.model";
import Header from "./header";

type Props = {
  children?: ReactNode;
  page: Page;
  header;
};

export default function Layout({ children, page, header }: Props) {
  let jsonPreview = {};
  if (page) jsonPreview["page"] = page;

  return (
    <>
      <Header data={header} />
      {children}
    </>
  );
}
