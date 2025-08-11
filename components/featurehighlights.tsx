import React from "react";
import { FeatureHighlights } from "../model/component-props/featurehighlights.models";
import parse from "html-react-parser";
const FeatureHighlightComponent = (data: FeatureHighlights) => {
  const isSingle = data?.featured_post?.length === 1;

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-4">{data?.title}</h2>
      <div className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
        {parse(data?.description)}
      </div>

      {isSingle ? (
        <div className="max-w-2xl mx-auto">
          <div className="rounded-lg shadow-md p-6 bg-blue-900 text-white">
            <h3 className="text-xl font-semibold mb-2">
              {data?.featured_post[0]?.title || "Untitled"}
            </h3>
            <p className="text-sm">
              {data?.featured_post[0]?.description ||
                "No description available."}
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.featured_post?.map((post, index) => (
            <div
              key={index}
              className={`rounded-lg shadow-md p-6 transition-transform duration-200 ${
                index % 2 === 0
                  ? "bg-blue-900 text-white"
                  : "bg-gray-100 text-black"
              }`}
            >
              <h3 className="text-xl font-semibold mb-2">
                {post?.title || "Untitled"}
              </h3>
              <p className="text-sm">
                {post?.description || "No description available."}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeatureHighlightComponent;
