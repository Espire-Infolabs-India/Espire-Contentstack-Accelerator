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

  function buildNavigation(ent, hd, ft) {
    let newHeader = { ...hd };
    let newFooter = { ...ft };
    if (ent.length !== newHeader.navigation_menu.length) {
      ent.forEach((entry) => {
        const hFound = newHeader?.navigation_menu.find(
          (navLink) => navLink.label === entry.title
        );
        if (!hFound) {
          newHeader.navigation_menu?.push({
            label: entry.title,
            page_reference: [
              { title: entry.title, url: entry.url, $: entry.$ },
            ],
            $: {},
          });
        }
        const fFound = newFooter?.navigation.link.find(
          (nlink) => nlink.title === entry.title
        );
        if (!fFound) {
          newFooter.navigation.link?.push({
            title: entry.title,
            href: entry.url,
            $: entry.$,
          });
        }
      });
    }
    return [newHeader, newFooter];
  }

  return <>{children}</>;
}
