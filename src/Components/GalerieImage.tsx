"use client"

import { ApiGaleryImagesResponse } from "@/app/api/galerie/images/types";
import ImageViewer from "awesome-image-viewer";
import Image from "next/image";
import { CSSProperties } from "react";

export default function GalerieImage({ useViewer, className, img, style }: { useViewer?: ApiGaleryImagesResponse, style?: CSSProperties, className: string, img: ApiGaleryImagesResponse[number] }) {
    return <Image
        onClick={useViewer ? () => {
            const findIndex = useViewer.findIndex(fi => fi.image == img.image);
            const iv = new ImageViewer({
                images: useViewer.map((i) => ({
                    mainUrl: i.fullsize,
                    thumbnailUrl: `/_next/image?url=${encodeURIComponent(i.image)}&w=256&q=75`,
                    description: i.metadata.description,
                })),
                currentSelected: findIndex,
                buttons: [
                    {
                        name: "Download",
                        iconSrc: "/Icons/download.svg",
                        iconSize: "18px auto",
                        onSelect: (() => {
                            const image = useViewer[iv["currentSelected"]];
                            var link = document.createElement('a');
                            link.href = image.fullsize;
                            link.download = image.fullsize.split("/").pop() || "Image.jpg";
                            document.body.appendChild(link);
                            link.click();
                            setTimeout(function () { link.parentNode?.removeChild(link); }, 10);
                        })
                    }
                ]
            });
            console.log("Open ImageViewer for", img.image, "at index", findIndex);
        } : undefined}
        key={img.image}
        src={img.image}
        width={img.metadata.imgSize.width}
        height={img.metadata.imgSize.height}
        className={className}
        style={style}
        alt={img.metadata.description}
        quality={50}
        loading="lazy"
    />
}