
export type ImageMetadata = {
    album: string;
    origin: string | null;
    tags: string[];
    description: string;
    exif: { [key: string]: unknown; } | null;
    imgSize: {
        width: number;
        height: number;
    };
};

export type ApiGaleryImagesResponse = {
    image: string;
    fullsize: string;
    metadata: ImageMetadata;
}[];
