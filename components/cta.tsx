import React from "react";
import Link from "next/link";
import { CTAProps } from "../model/component-props/cta-model";

type CTAComponentProps = CTAProps & {
  variant?: "hero" | "default";
};

export default function CTA(props: CTAComponentProps) {
  const page = props?.page_reference?.[0];
  const url = page?.url;
  const title = props?.cta_title || "Learn More";

  if (!url) return null;

  const variant = props?.variant || "default";

  const baseClasses =
    "rounded px-7 pb-[8px] pt-[10px] text-sm font-medium uppercase leading-normal transition duration-150 ease-in-out focus:outline-none focus:ring-0";

  const variantClasses =
    variant === "hero"
      ? "border-2 border-neutral-50 text-neutral-50 hover:border-neutral-100 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-neutral-100 focus:border-neutral-100 focus:text-neutral-100 active:border-neutral-200 active:text-neutral-200"
      : "text-white bg-[var(--royalblue)] hover:bg-opacity-90 focus:bg-opacity-100 active:bg-opacity-100";

  return (
    <div className="container my-10 m-auto px-5 md:px-0">
      <Link
        href={url}
        rel={props?.open_in_new_tab ? "noopener noreferrer" : undefined}
        target={props?.open_in_new_tab ? "_blank" : "_self"}
        className={`${baseClasses} ${variantClasses}`}
      >
        {title}
      </Link>
    </div>
  );
}
