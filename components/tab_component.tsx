import React, { useState } from "react";
import Image from "next/image";
import { TabProps } from "../model/component-props/tabprops.model";
import parse from "html-react-parser";
//export default function TabComponent({ title, tabs, tab_orientation = "vertical" }: TabProps) {
export default function Tabcomponent(data: TabProps) {
  console.log("Tab data:", data);
  const [activeTab, setActiveTab] = useState(0);

console.log("Tab data.tab_orientation Data:", data.tab_orientation);

  const isVertical = data.tab_orientation === "Vertical";

  return (
    <div className="tab-component py-8 font-poppin">
      {data.title && <h2 className="text-2xl font-semibold mb-4">{data.title}</h2>}

      <div className={`flex ${isVertical ? "flex-row" : "flex-col"} gap-6`}>
        {/* Tab Headers */}
        <div className={`${isVertical ? "flex flex-col w-1/4" : "flex space-x-4 border-b"}`}>
          {data.tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`py-2 px-4 text-left ${
                activeTab === index
                  ? "font-bold text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              {tab.title}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className={`${isVertical ? "w-3/4" : ""}`}>
          <div
            className="prose"
          

          >
             {parse(data.tabs?.[activeTab]?.description)}
            </div>
        </div>
      </div>
    </div>
  );
}