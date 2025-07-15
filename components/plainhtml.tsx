import React from "react";
import { PlainHtmlProps } from "../model/component-props/plain-html.model";
import parse from "html-react-parser";

export default function PlainHtmlComponent({ plain_html }: PlainHtmlProps) {
  if (!plain_html) return null;

  return <>{parse(plain_html)}</>;
}
