import React, {ReactNode} from 'react';

interface TwoColImageCtaLogoProps {
  fields: {
    leftColumn: {
      headline: ReactNode;
      description: ReactNode;
      ctaButton: ReactNode;
      backgroundImage: JSX.Element;
      savingsTag?: ReactNode;
    };
    rightColumn: {
      headline: ReactNode;
      description: ReactNode;
      ctaButton: ReactNode;
      backgroundImage: JSX.Element;
    };
  };
}

const TwoColImageCtaLogo: React.FC<TwoColImageCtaLogoProps> = ({ fields }) => {
  return (
    <div className="flex flex-col md:flex-row w-full">
      {/* Left Column */}
      <div className="w-full md:w-1/2 relative">
        <div className="absolute inset-0 z-0">
          {fields.leftColumn.backgroundImage}
        </div>
        <div className="relative z-10 p-8 md:p-12 flex flex-col h-full">
          <div className="flex flex-col gap-4 mt-8">
            <h2 className="text-white text-3xl md:text-4xl font-bold">
              {fields.leftColumn.headline}
            </h2>
            <div className="w-16 h-1 bg-white"></div>
            <p className="text-white text-base md:text-lg mt-4">
              {fields.leftColumn.description}
            </p>
          </div>
          <div className="mt-8">
            <button className="bg-white text-black font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-colors">
              {fields.leftColumn.ctaButton}
            </button>
          </div>
          {fields.leftColumn.savingsTag && (
            <div className="absolute top-1/2 right-8 transform translate-y-8 md:translate-y-0">
              {fields.leftColumn.savingsTag}
            </div>
          )}
        </div>
      </div>

      {/* Right Column */}
      <div className="w-full md:w-1/2 relative">
        <div className="absolute inset-0 z-0">
          {fields.rightColumn.backgroundImage}
        </div>
        <div className="relative z-10 p-8 md:p-12 flex flex-col h-full">
          <div className="flex flex-col gap-4 mt-8">
            <h2 className="text-white text-3xl md:text-4xl font-bold">
              {fields.rightColumn.headline}
            </h2>
            <div className="w-16 h-1 bg-white"></div>
            <p className="text-white text-base md:text-lg mt-4">
              {fields.rightColumn.description}
            </p>
          </div>
          <div className="mt-8">
            <button className="bg-white text-black font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-colors">
              {fields.rightColumn.ctaButton}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwoColImageCtaLogo;