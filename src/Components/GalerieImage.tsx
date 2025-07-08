"use client"

import { ApiGaleryImagesResponse } from "@/app/api/galerie/images/types";
import ImageViewer from "awesome-image-viewer";
import Image from "next/image";
import { CSSProperties } from "react";

export default function GalerieImage({ useViewer, className, img, style }: { useViewer?: ApiGaleryImagesResponse, style?: CSSProperties, className: string, img: ApiGaleryImagesResponse[number] }) {
    const width = img.metadata.exif?.ImageWidth || img.metadata.imgSize?.width || undefined
    const height = img.metadata.exif?.ImageHeight || img.metadata.imgSize?.height || undefined
    if (!width || !height) return;
    return <Image
        onClick={useViewer ? () => {
            const findIndex = useViewer.findIndex(fi => fi.image == img.image);
            new ImageViewer({
                images: useViewer.map((i) => ({
                    mainUrl: i.fullsize,
                    thumbnailUrl: i.image,
                    description: i.metadata.description,
                })),
                currentSelected: findIndex
            });
            console.log("Open ImageViewer for", img.image, "at index", findIndex);
        } : undefined}
        key={img.image}
        src={img.image}
        width={width}
        height={height}
        className={className}
        style={style}
        alt={img.metadata.description}
        quality={50}
        loading="lazy"
    />
}