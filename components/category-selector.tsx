import Image from "next/image";
interface CategoryItem {
  image: string;
  title: string;
}

interface CategoryDataValueProps {
  CategoryDataValue: CategoryItem[];
}

const CategorySelector = ({ CategoryDataValue }: CategoryDataValueProps) => {
  return (
    <>
      <div className="container m-auto bg-gray-100 py-8 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">
            Select a category below to browse for your product model
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CategoryDataValue?.map((category, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 p-6 flex flex-col items-center cursor-pointer"
              >
                <div className="w-16 h-16 mb-4 flex items-center justify-center">
                  {/* <img src={category.image} alt="" /> */}
                  <Image src={category.image} width={100} height={100} alt="" />
                </div>
                <h3 className="text-gray-800 text-center font-medium">
                  {category.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CategorySelector;
