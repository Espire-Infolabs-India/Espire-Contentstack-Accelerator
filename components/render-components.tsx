import React from "react";
import { Page } from "../model/page.model";
import { ComponentMap } from "../helper/component-factory";

interface RenderProps {
  pageComponents: Page;
  blogPost?: any;
  entryUid: string;
  contentTypeUid: string;
  locale: string;
}

export default function RenderComponents({
  pageComponents,
  blogPost,
  entryUid,
  contentTypeUid,
  locale,
}: RenderProps) {
  return (
    <div
      data-pageref={entryUid}
      data-contenttype={contentTypeUid}
      data-locale={locale}
    >
      {pageComponents?.page_components.map((component, index) => {
        const componentType = component?._content_type_uid;
        if (!componentType) {
          console.warn(
            `Missing _content_type_uid for component at index ${index}`
          );
          return null;
        }
        const renderComponent = ComponentMap[componentType];
        if (!renderComponent) {
          console.warn(`Unknown component type: ${componentType}`);
          return null;
        }
        return (
          <div key={index} data-component-type={componentType}>
            {renderComponent(component, blogPost)}
          </div>
        );
      })}
    </div>
  );
}
