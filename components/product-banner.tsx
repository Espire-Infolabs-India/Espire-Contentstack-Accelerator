import Image from "next/image";
import ListingBanner from '../public/Mesh_home.webp'
export default function Productlisting() {
    return (
      <>
        <div className="w-full">
            <Image width={1920} height={768} src={ListingBanner} />
          </div>
      </>
    );
  }