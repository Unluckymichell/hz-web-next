import React, { PropsWithChildren } from "react";
import Image from "next/image";
import Link from "next/link";

const ImageContainer = ({ children }: PropsWithChildren) => (
  <div className="shadow-black shadow-md border-1 rotate-2 border-green-100 bg-green-100">
    <div className="shadow-black shadow-md border-1 -rotate-5 border-blue-100 bg-blue-100">
      <div className="flex justify-center items-center shadow-black shadow-md w-80 aspect-4/3 border-1 rotate-3 border-green-100 bg-green-100">
        <div className="h-[90%] w-[90%] overflow-clip">{children}</div>
      </div>
    </div>
  </div>
);

function GalerieLink() {
  return (
    <div className="flex justify-center my-8 gap-10 flex-wrap">
      <ImageContainer>
        <Image
          className="h-full w-full transition-[scale] ease-out duration-1500 object-cover hover:scale-120"
          src={"/Images/Home/01_center.jpg"}
          alt="Nice Image"
          width={1920}
          height={1080}
        />
      </ImageContainer>
      <ImageContainer>
        <Image
          className="h-full w-full transition-[scale] ease-out duration-1500 object-cover hover:scale-120"
          src={"/Images/Home/02_center.jpg"}
          alt="Nice Image"
          width={1920}
          height={1080}
        />
      </ImageContainer>
      <ImageContainer>
        <Image
          className="shad h-full w-full transition-[scale] ease-out duration-1500 object-cover hover:scale-120"
          src={"/Images/Home/03_center.jpg"}
          alt="Nice Image"
          width={1920}
          height={1080}
        />
      </ImageContainer>
      <div className="w-full flex justify-center">
        <Link href={"/galery"}>
          <span className="w-40 h-10 bg-[var(--highlight)] in-focus:bg-[var(--highlight-text)] hover:bg-[var(--highlight-text)] flex justify-center items-center rounded-2xl">
            View More
          </span>
        </Link>
      </div>
    </div>
  );
}

export default GalerieLink;
