import { type ApiGaleryImagesResponse } from "@/app/api/galerie/images/types";
import { getGalerieImageList } from "@/app/api/galerie/images/getGalerieImageList";
import GalerieImage from "@/Components/GalerieImage";
import { ImageStackContainer } from "@/Components/ImageContainer";
import ContentSection from "@/Parts/Content/ContentSection";
import { GalerieImageGrid } from "@/Parts/GalerieImageGrid";
import Navigation from "@/Parts/Navigation";
import Link from "next/link";

const nav = [
  /*{ link: "/#vorstellung", label: "Vorstellung" },*/
  { link: "/", id: "", label: "< Back" },
  { link: "#galery", id: "galery", label: "Galerie" },
];

export const dynamic = "force-dynamic";

export default async function Galerie({ searchParams }: { searchParams: Promise<{ album?: string | string[] }> }) {
  let { album: onlyAlbum } = await searchParams;
  if (Array.isArray(onlyAlbum)) onlyAlbum = onlyAlbum[0];

  let images = (await getGalerieImageList())
  if (onlyAlbum) images =
    images.filter(i => i.metadata.album == onlyAlbum);

  const albumGroupedImages = images.reduce((acc, img) => {
    const album = img.metadata.album || "Unassigned";
    if (!acc[album]) {
      acc[album] = [];
    }
    acc[album].push(img);
    return acc;
  }, {} as Record<string, ApiGaleryImagesResponse>);

  return (
    <Navigation links={nav}>
      <ContentSection id="galery" title={onlyAlbum ? `Galerie - ${onlyAlbum}` : "Galerie"}>
        <p className="text-sm sm:text-md">
          Hier könnt ihr alle Bilder von unserer Hochzeit und den Flitterwochen sehen.
          <br />
          <br />
          Klickt auf ein Bild, um es in voller Größe zu sehen.
          <br />
          Download funktion kommt bald noch!
          <br />
          <br />
          Die Alben welche von unserer Fotografin erstellt wurden, sind mit <span className="font-bold">{"(Fotografin)"}</span> markiert.
          <br />
          Wir bedanken uns bei ihr für die tollen Bilder!
          <br />
          Sie findet ihr unter <a href="https://inamiller-fotografie.de/" target="_blank" className="text-[var(--color-pink-500)] hover:underline">inamiller-fotografie.de</a>.
        </p>
        <div className="flex justify-center my-8 gap-10 flex-wrap">
          {onlyAlbum ? <Link href={"/galery"}>
            <p className="border-1 border-black rounded-2xl p-4 hover:scale-110">{"< "}Alle Bilder</p>
          </Link>
            : Object.entries(albumGroupedImages).map(([album, [img]]) => {
              const width = img.metadata.exif?.ImageWidth || img.metadata.imgSize?.width || undefined
              const height = img.metadata.exif?.ImageHeight || img.metadata.imgSize?.height || undefined
              if (!width || !height) return;
              return <Link key={album} href={`?album=${encodeURIComponent(album)}`}>
                <ImageStackContainer>
                  <GalerieImage
                    key={img.image}
                    img={img}
                    className="h-full w-full transition-[scale] ease-out duration-1500 object-cover hover:scale-120"
                  />
                  <p className="relative bottom-1/2 left-1/2 -translate-1/2 pointer-events-none text-white text-border-black-4 font-extrabold text-xl">{album}</p>
                </ImageStackContainer>
              </Link>
            })}
        </div>

        <GalerieImageGrid albumGroupedImages={albumGroupedImages} allImages={images} />
      </ContentSection>
    </Navigation>
  );
}
