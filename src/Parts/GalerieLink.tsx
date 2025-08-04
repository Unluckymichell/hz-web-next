import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ImageStackContainer } from "../Components/ImageContainer";
import { getListOfAlbumWithCoverImage } from "@/app/api/galerie/albums/getListOfAlbumWithCoverImage";

export function GalerieLinkFallback() {
  return (
    <div className="flex justify-center my-8 gap-10 flex-wrap">
      <span className="w-[60%] h-20 bg-[var(--highlight)] text-gray-700 flex justify-center items-center rounded-2xl animate-pulse">
        Loading Albums...
      </span>
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

async function GalerieLink() {
  const albums = (await getListOfAlbumWithCoverImage());

  // Randomise albums
  const shuffledAlbumsKeys = Object.keys(albums).sort(() => Math.random() - 0.5).slice(0, 3);

  return (
    <div className="flex justify-center my-8 gap-10 flex-wrap">
      {
        shuffledAlbumsKeys.map((a) => <Link key={a} href={`/galery?album=${encodeURIComponent(a)}`}><ImageStackContainer>
          <Image
            className="h-full w-full transition-[scale] ease-out duration-1500 object-cover hover:scale-120"
            src={albums[a].image}
            alt="Galerie Cover Image"
            width={albums[a].metadata.imgSize.width/3}
            height={albums[a].metadata.imgSize.height/3}
          />
          <p className="relative bottom-1/2 left-1/2 -translate-1/2 pointer-events-none text-white text-border-black-4 font-extrabold text-xl">{a}</p>
        </ImageStackContainer></Link>)
      }
      <div className="w-full flex justify-center">
        <Link href={"/galery"}>
          <span className="w-50 h-15 bg-[var(--highlight)] in-focus:bg-[var(--highlight-text)] hover:bg-[var(--highlight-text)] flex justify-center items-center rounded-2xl">
            Alle Bilder und Alben ansehen
          </span>
        </Link>
      </div>
    </div>
  );
}

export default GalerieLink;
