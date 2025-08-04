import React, { useState } from "react";
import Image from "next/image";
import { TabProps } from "../model/component-props/tabprops.model";

export default function Tabcomponent(data: TabProps) {

  console.log("Tab data: 2", data);
  const [activeTab, setActiveTab] = useState(0);

  return (
<div className="tab-component py-8 font-poppin">
      <h2 className="text-2xl font-semibold mb-4">{data?.title}</h2>

      {/* Tab Headers */}
      <div className="flex space-x-4 border-b mb-6">
        {data?.tabs?.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`pb-2 px-4 ${
              activeTab === index
                ? "border-b-2 border-blue-600 font-bold text-blue-600"
                : "text-gray-600 hover:text-black"
            }`}
          >
            {tab.title}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: data.tabs?.[activeTab]?.description }}
        />
      </div>
    </div>

  );
}