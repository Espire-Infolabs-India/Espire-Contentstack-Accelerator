import React, {ReactNode} from 'react';

interface WifiSolutionItem {
  image: JSX.Element;
  title: ReactNode;
  description: ReactNode;
  buttonText: ReactNode;
}

interface ThumbnailCarouselProps {
  fields: {
    heading: ReactNode;
    wifiSolutions: WifiSolutionItem[]; // List of wifi solutions
  };
}

const ThumbnailCarousel: React.FC<ThumbnailCarouselProps> = ({ fields }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-3xl font-bold mb-8 text-gray-800">
        {fields.heading}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {fields.wifiSolutions.map((solution, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="w-full h-64 mb-4 overflow-hidden">
              {solution.image}
            </div>
            <div className="text-center mb-4">
              <div className="text-xl font-semibold text-gray-800">
                {solution.title}
              </div>
            </div>
            <div className="text-center mb-4">
              <div className="text-md font-semibold text-gray-800">
                {solution.description}
              </div>
            </div>
            <div className="mt-auto">
              <button className="border-2 border-black rounded-full px-8 py-3 font-bold text-black hover:bg-black hover:text-white transition-colors duration-300">
                {solution.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThumbnailCarousel;