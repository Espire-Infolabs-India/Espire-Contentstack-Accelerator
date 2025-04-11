import React, {ReactNode} from 'react';

interface TwoColImageCtaProps {
  fields: {
    leftColumn: {
      logo: JSX.Element;
      title: ReactNode;
      description: ReactNode;
      primaryCta: ReactNode;
      secondaryCta: ReactNode;
      productImage: JSX.Element;
      productLabels: {
        newLabel?: ReactNode;
        modelNumber: ReactNode;
      }[];
    };
    rightColumn: {
      logo: JSX.Element;
      title: ReactNode;
      description: ReactNode;
      primaryCta: ReactNode;
      secondaryCta: ReactNode;
      productImage: JSX.Element;
      productLabels: {
        newLabel?: ReactNode;
        modelNumber: ReactNode;
      }[];
    };
  };
}

const TwoColImageCta: React.FC<TwoColImageCtaProps> = ({ fields }) => {
  return (
    <div className="flex flex-col md:flex-row w-full">
      {/* Left Column */}
      <div className="w-full md:w-1/2 bg-black text-white p-8 md:p-12 flex flex-col">
        <div className="mb-8">
          {fields.leftColumn.logo}
        </div>
        <div className="mb-4 text-2xl md:text-3xl font-bold">
          {fields.leftColumn.title}
        </div>
        <div className="h-1 w-48 bg-white mb-6"></div>
        <div className="mb-8 text-sm md:text-base">
          {fields.leftColumn.description}
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="rounded-full bg-white text-black font-bold py-3 px-6">
            {fields.leftColumn.primaryCta}
          </div>
          <div className="rounded-full bg-blue-600 text-white font-bold py-3 px-6">
            {fields.leftColumn.secondaryCta}
          </div>
        </div>
        <div className="mt-auto relative">
          {fields.leftColumn.productImage}
          <div className="absolute bottom-4 left-0 flex gap-16 md:gap-24 lg:gap-32 justify-center w-full">
            {fields.leftColumn.productLabels.map((label, index) => (
              <div key={index} className="flex flex-col items-center">
                {label.newLabel && (
                  <div className="bg-blue-500 text-white text-xs font-bold px-3 py-1 mb-2">
                    {label.newLabel}
                  </div>
                )}
                <div className="text-white text-lg font-bold">
                  {label.modelNumber}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="w-full md:w-1/2 bg-black text-white p-8 md:p-12 flex flex-col">
        <div className="mb-8">
          {fields.rightColumn.logo}
        </div>
        <div className="mb-4 text-2xl md:text-3xl font-bold">
          {fields.rightColumn.title}
        </div>
        <div className="h-1 w-48 bg-white mb-6"></div>
        <div className="mb-8 text-sm md:text-base">
          {fields.rightColumn.description}
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="rounded-full bg-white text-black font-bold py-3 px-6">
            {fields.rightColumn.primaryCta}
          </div>
          <div className="rounded-full bg-blue-600 text-white font-bold py-3 px-6">
            {fields.rightColumn.secondaryCta}
          </div>
        </div>
        <div className="mt-auto relative">
          {fields.rightColumn.productImage}
          <div className="absolute bottom-4 left-0 flex gap-8 md:gap-16 justify-center w-full">
            {fields.rightColumn.productLabels.map((label, index) => (
              <div key={index} className="flex flex-col items-center">
                {label.newLabel && (
                  <div className="bg-blue-500 text-white text-xs font-bold px-3 py-1 mb-2">
                    {label.newLabel}
                  </div>
                )}
                <div className="text-white text-lg font-bold">
                  {label.modelNumber}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwoColImageCta;