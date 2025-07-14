import React from "react";
import { PlainHtmlProps } from "../model/component-props/plain-html.model";

export default function PlainHtmlComponent({ plain_html }: PlainHtmlProps) {
  if (!plain_html) return null;

  return (
    <div dangerouslySetInnerHTML={{ __html: plain_html }} />
  );
}
