import { useState, KeyboardEvent } from "react";
import parse from "html-react-parser";

type AccordionItem = {
  title: string;
  description: string; // HTML string
  _metadata: { uid: string };
};

type AccordionProps = {
  heading?: string;
  accordion: AccordionItem[];
  defaultOpenIndex?: number | null;
  className?: string;
};

const Accordion = ({
  heading = "FAQ",
  accordion,
  defaultOpenIndex = 0,
  className = "",
}: AccordionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);

  const toggle = (i: number) => setOpenIndex((p) => (p === i ? null : i));
  const keyToggle = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle(i);
    }
  };

  return (
    <section className={`w-full max-w-5xl mx-auto ${className}`}>
      {/* Page heading like your screenshot */}
      {heading && (
        <h2 className="text-[28px] md:text-[32px] font-semibold text-center tracking-wide mb-6 md:mb-8">
          {heading}
        </h2>
      )}

      <div className="bg-transparent">
        {accordion.map((item, i) => {
          const isOpen = openIndex === i;
          const contentId = `acc-panel-${item._metadata.uid}`;
          const btnId = `acc-btn-${item._metadata.uid}`;

          return (
            <div
              key={item._metadata.uid}
              className={[
                isOpen
                  ? // open: card look
                    "rounded-xl border border-gray-200 shadow-[0_2px_12px_rgba(0,0,0,0.06)] bg-white mb-5"
                  : // closed: flat row with thin divider
                    "bg-white border-b border-gray-200",
              ].join(" ")}
            >
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={contentId}
                onClick={() => toggle(i)}
                onKeyDown={(e) => keyToggle(e, i)}
                className={[
                  "w-full flex items-start justify-between text-left transition-colors rounded-xl",
                  isOpen ? "px-7 md:px-9 py-6" : "px-6 md:px-7 py-5",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/70 hover:bg-gray-50",
                ].join(" ")}
              >
                <span
                  className={[
                    "font-semibold text-gray-900 leading-snug pr-6",
                    isOpen
                      ? "text-[18px] md:text-[20px]"
                      : "text-[16px] md:text-[18px]",
                  ].join(" ")}
                >
                  {item.title}
                </span>

                {/* thinner chevron to match screenshot */}
                <svg
                  className={[
                    "mt-1 h-5 w-5 flex-none text-gray-600 transition-transform duration-200 ease-out",
                    isOpen ? "rotate-180" : "rotate-0",
                  ].join(" ")}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2" /* thin line */
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {/* subtle divider only when open (like screenshot) */}
              {isOpen && (
                <div className="mx-7 md:mx-9 border-t border-gray-200" />
              )}

              {/* collapsible content */}
              <div
                id={contentId}
                role="region"
                aria-labelledby={btnId}
                className={[
                  "overflow-hidden transition-[max-height,opacity,margin] duration-300 ease-in-out",
                  isOpen
                    ? "max-h-[700px] opacity-100 mt-0"
                    : "max-h-0 opacity-0 -mt-2", // slight lift when closed for tighter feel
                ].join(" ")}
              >
                {item?.description && (
                  <div className="px-7 md:px-9 py-6 text-gray-800 leading-relaxed text-[16px] md:text-[18px]">
                    {parse(item.description)}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Accordion;
