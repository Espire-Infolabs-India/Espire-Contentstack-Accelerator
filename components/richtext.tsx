import React from "react";
import { RichTextProps } from "../model/component-props/richtext.model";

import parse from "html-react-parser";
export default function RichTextComponent(data: RichTextProps) {
    console.log("rte data",data);
  return (
    <>
      <section className="mt-10">
        <div className="rich-text container m-auto px-4 md:px-0">
          {parse(data?.content)}
        </div>
      </section>
    </>
  );
}
