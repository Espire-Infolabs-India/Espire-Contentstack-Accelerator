import Link from "next/link";
import Image from "next/image";
import parse from "html-react-parser";
export type CaseStudyEntry = {
  title?: string;
  url?: string;
  description?: string;
  image?: {
    url: string;
  };
  tags?: string[];
  publish_details?: {
    time: string;
  };
  uid?: string;
};

type Props = {
  casestudy: CaseStudyEntry[];
};

export default function CaseStudyCards({ casestudy }: Props) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">     

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {casestudy?.map((casestudy, index) => (
          <div
            key={casestudy?.uid || index}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
          >
            <Link href={casestudy?.url || "#"} className="block h-full">
              <div className="relative h-48 w-full">
                {casestudy?.image?.url && (
                  <Image
                    src={casestudy.image.url}
                    alt={casestudy?.title || "Case Study Image"}
                    fill
                    className="object-cover"
                  />
                )}
              </div>

              <div className="p-4 flex flex-col gap-3">
                <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
                  {casestudy?.title}
                </h3>

                {casestudy?.description && (
                  <div className="text-sm text-gray-600 line-clamp-3">
                    {parse(casestudy?.description)}
                  </div>
                )}

                <div className="flex justify-between items-center mt-auto pt-2 text-sm text-gray-500">
                  <span>
                    {casestudy?.publish_details?.time
                      ? new Date(
                          casestudy?.publish_details.time
                        ).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })
                      : "Invalid Date"}
                  </span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
