import Image from "next/image";
import Link from "next/link";

export default function ProductCategory({ ProductData }) {
  return (
    <>
      <div className="w-full mb-5 mt-5">
        {ProductData.map((item: any) => {
          return (
            <>
              <div className="flex align-items-center py-5 border-bottom border-width-1">
                <div className="list-product-image">
                  <Image src={item.img} width={500} height={400} />
                </div>
                <div>
                  <p>{item.producteyes}</p>
                  <h3 className="my-3">
                    <Link href="/home/wifi/routers/rs700s/">{item.title}</Link>
                  </h3>
                  <p className="text-2">{item.dis}</p>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}
