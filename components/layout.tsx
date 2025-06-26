import React, { ReactNode, useState, useEffect } from "react";
import { Page } from "../model/page.model";

type Props = {
  children?: ReactNode;
  page: Page;
  entries: Page[];
};

export default function Layout({ children, page, entries }: Props) {
  let jsonPreview = {};
  if (page) jsonPreview["page"] = page;

  return <>{children}</>;
}
