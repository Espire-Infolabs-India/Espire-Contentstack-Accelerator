import React, {ReactNode} from 'react';

interface SwimlaneContentContainerProps {
  fields: {
    backgroundImage: JSX.Element;
    headline: ReactNode;
    description: ReactNode;
    ctaButton: ReactNode;
    productImage: ReactNode;
  };
}

const SwimlaneContentContainer: React.FC<SwimlaneContentContainerProps> = ({ fields }) => {
  return (
    <div className="relative w-full overflow-hidden">
      <div className="flex flex-col md:flex-row items-center">
        {/* Left content section */}
        <div className="w-full ">
          <div className="absolute inset-0 z-0">
            {fields.backgroundImage}
          </div>
          
          <div className="relative z-10 p-8 md:p-12 lg:p-16 flex flex-col justify-center min-h-[300px] md:min-h-[400px] lg:min-h-[500px]">
            <div style={{'background': 'rgba(255, 255, 255, 0.7)', 'padding': '17px 14px'}}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4">
                {fields.headline}
              </h2>
              <p className="text-base md:text-lg text-black mb-6 max-w-lg">
                {fields.description}
              </p>
              <div className="mt-2 text-white">
                <button className="bg-black text-white rounded-full px-6 py-3 font-medium uppercase text-sm tracking-wide">
                  {fields.ctaButton}
                </button>
              </div>
            </div>  
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwimlaneContentContainer;