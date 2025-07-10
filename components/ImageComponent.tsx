import React from "react";
import { ImageComponentProps } from "../model/common.model";

export default function ImageComponent({ file }: ImageComponentProps) {
  if (!file?.url) return null;

  return (
    <div className="w-full flex justify-center items-center p-4">
      <img
        src={file.url}
        alt={file.title || "Image"}
        title={file.title}
        loading="lazy"
        className="max-w-full h-auto rounded-lg shadow-md"
      />
    </div>
  );
}
