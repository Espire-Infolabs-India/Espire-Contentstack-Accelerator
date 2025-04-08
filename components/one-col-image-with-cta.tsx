import React, {ReactNode} from 'react';

interface OneColImageWithCtaProps {
  fields: {
    backgroundImage: JSX.Element;
    title: ReactNode;
    description: ReactNode;
    ctaButton: ReactNode;
  };
}

const OneColImageWithCta: React.FC<OneColImageWithCtaProps> = ({ fields }) => {
  return (
    <div className="relative w-full overflow-hidden">
      <div className="flex flex-col md:flex-row w-full">
        {/* Left side - Image */}
        <div className="w-full md:w-1/2 h-[300px] md:h-[400px] lg:h-[500px] relative">
          <div className="absolute inset-0 w-full h-full">
            {fields.backgroundImage}
          </div>
        </div>
        
        {/* Right side - Content */}
        <div className="w-full md:w-1/2 bg-gray-100 p-6 md:p-10 lg:p-16 flex flex-col justify-center">
          <div className="max-w-xl">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {fields.title}
            </h2>
            <p className="text-base md:text-lg text-gray-700 mb-8">
              {fields.description}
            </p>
            <div className="inline-block">
              <button className="bg-black text-white rounded-full px-8 py-3 font-medium hover:bg-gray-800 transition-colors duration-300">
                {fields.ctaButton}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OneColImageWithCta;