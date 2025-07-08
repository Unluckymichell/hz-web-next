"use client"

import { ApiGaleryImagesResponse } from "@/app/api/galerie/images/route";
import GalerieImage from "@/Components/GalerieImage";

export function GalerieImageGrid({ albumGroupedImages, allImages }: { albumGroupedImages: Record<string, ApiGaleryImagesResponse>, allImages: ApiGaleryImagesResponse }) {
  return (
    <div className="container mx-auto px-4">
      {
        // Map through the albums and their images, displaying them in a grid format
        Object.entries(albumGroupedImages).map(([album, images], i) => (
          <div key={album} className="mb-8">
            <h2 className="text-xl font-semibold mb-4">{album}</h2>
            <div className="flex flex-wrap gap-4 justify-center">
              {images.map((img, i2) =>
                <GalerieImage
                  useViewer={allImages}
                  img={img}
                  key={img.image}
                  className="rounded shadow"
                  style={{
                    height: "150px",
                    width: "auto",
                  }} />
              )}
            </div>
          </div>
        ))
      }
    </div>
  );
}