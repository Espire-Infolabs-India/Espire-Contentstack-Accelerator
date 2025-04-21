import React, {ReactNode} from 'react';

interface ProductBuyInfoProps {
  fields: {
    title: ReactNode;
    subtitle: ReactNode;
    ctaButton: ReactNode;
    backgroundImage: JSX.Element;
  };
}

const ProductBuyInfo: React.FC<ProductBuyInfoProps> = ({ fields }) => {
  return (
    <div className="relative w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <div className="w-full h-full"> 
          {fields.backgroundImage}
        </div>
      </div>
      
      {/* Content Container */}
      <div className="relative z-10 flex flex-col md:flex-row items-center">
        {/* Text Content */}
        <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 text-white">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {fields.title}
          </h1>
          <div className="w-100 h-1 bg-white mb-6"></div>
          <p className="text-base md:text-lg mb-8 text-white">
            {fields.subtitle}
          </p>
          <div className="inline-block">
            <button className="bg-white text-black font-bold py-3 px-6 rounded-full hover:bg-opacity-90 transition duration-300">
              {fields.ctaButton}
            </button>
          </div>
        </div>
        
        {/* Product Image */}
        <div className="w-full md:w-1/2 relative">
          <div className="absolute bottom-0 left-0 w-full h-24 md:h-full bg-white transform -skew-y-6 origin-bottom-left -z-10 hidden md:block"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductBuyInfo;