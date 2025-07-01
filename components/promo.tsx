import React from "react";
import Image from "next/image";
import { PromoProps } from "../model/component-props/promoprops.model";

export default function Promo(data: PromoProps) {
  const variant = data?.variant?.toLowerCase() || "default";
  const imageUrl = data?.image?.url;
  const altText = data?.image?.title || "Promo Image";

  const renderTitleAndDescription = () => (
    <>
      <h2 className="text-3xl font-semibold mb-4 font-poppins">{data?.title}</h2>
      {data?.description && (
        <div
          className="mt-4 text-base font-poppins"
          dangerouslySetInnerHTML={{
            __html: data?.description || "No description available.",
          }}
        />
      )}
    </>
  );

  if (variant === "left" || variant === "right") {
    const isRight = variant === "right";
    return (
      <div className="flex flex-col md:flex-row items-center py-2 md:pt-6 md:pb-2 px-0 md:px-4 bg-gray-100">
        <div
          className={`md:w-1/2 flex justify-center ${
            isRight ? "order-2 md:order-1" : ""
          }`}
        >
          {imageUrl && (
            <Image src={imageUrl} width={600} height={400} alt={altText} />
          )}
        </div>

        <div
          className={`md:w-1/2 p-4 md:p-6 ${
            isRight ? "order-1 md:order-2" : ""
          }`}
        >
          {renderTitleAndDescription()}
        </div>
      </div>
    );
  }

  return (
    <div className="py-10 font-sans">
      <div className="container mx-auto px-4 md:px-0 flex flex-col md:flex-row justify-between items-center gap-x-6 gap-y-8">
        <div className="md:w-full">
          {imageUrl && (
            <Image
              className="mb-5"
              src={imageUrl}
              width={400}
              height={101}
              alt={altText}
            />
          )}
          <h2 className="text-2xl sm:text-5xl mb-4 font-poppin">
            {data?.title}
          </h2>
          {data?.description && (
            <div
              className="text-base font-poppins"
              dangerouslySetInnerHTML={{
                __html: data?.description || "No description available.",
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
