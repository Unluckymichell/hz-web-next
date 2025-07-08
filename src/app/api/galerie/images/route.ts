import { readdir, readFile, writeFile } from "fs/promises";
import { mimeTypeToFileExtension } from "../../upload/route";
import { ExifImage } from "exif";
import imageSize from "image-size";

export type ImageMetadata = {
    album: string;
    origin: string | null;
    tags: string[];
    description: string;
    exif: { [key: string]: any } | null;
    imgSize: {
        width: number;
        height: number;
    };
}

export type ApiGaleryImagesResponse = {
    image: string;
    fullsize: string;
    metadata: ImageMetadata;
}[]

const getExif = async (buffer: Buffer) => {
    return new Promise((resolve, reject) => {
        try {
            new ExifImage(buffer, (error, exifData) =>
                error ?
                    reject(error) :
                    resolve(exifData)
            );
        } catch (error) {
            reject(error);
        }
    });

};

const generateMetadata = async (imagePath: string): Promise<ImageMetadata> => {
    const buffer = await readFile(imagePath);
    // const dimensions = imageSize(buffer);
    let imgSize = imageSize(buffer);
    let exif = null;
    try {
        exif = await getExif(buffer);
    } catch (error) {
        console.warn(`No EXIF data found for image ${imagePath}:`, error);
    }

    return {
        album: "Fotoupload",
        origin: null,
        tags: ["New"],
        description: "A New Image",
        exif: exif as { [key: string]: any } | null,
        imgSize
    };
};

export async function getGalerieImageList() {
    // List all images in the public/Uploads directory
    const basePath = "public";
    const uploadsDir = "Galerie";
    const thumbDir = "Galerie/thumb";
    const images = (await readdir(`${basePath}/${uploadsDir}`, { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name));
    const filteredImages = images.filter(
        (file) => file.isFile() && Object.values(mimeTypeToFileExtension).some(ext => file.name.endsWith(ext))
    ).map(file => file.name);

    // Each image should have a json file with metadata in the same directory
    // If the image has no metadata, create a default metadata object
    const imageData: ApiGaleryImagesResponse = [];

    await Promise.all(filteredImages.map(async (image) => {
        const metadataPath = `${basePath}/${uploadsDir}/${image}.json`;
        try {
            const metadataFile = await readFile(metadataPath, "utf-8");
            const metadata = JSON.parse(metadataFile);
            imageData.push({
                image: `/${thumbDir}/${image}`,
                fullsize: `/${uploadsDir}/${image}`,
                metadata,
            });
        } catch (error) {
            // If file doesn't exist or can't be read, generate new metadata and save it
            const newMetadata = await generateMetadata(`${basePath}/${uploadsDir}/${image}`);
            imageData.push({
                image: `/${uploadsDir}/${image}`,
                fullsize: `/${uploadsDir}/${image}`,
                metadata: newMetadata,
            });
            // Save the new metadata to a file
            await writeFile(metadataPath, JSON.stringify(newMetadata, null, 2));
            console.warn(`Metadata for image ${image} not found, generated new metadata.`);
        }
    }));

    return imageData;
}

export const GET = async (req: Request) => {
    const imageData = await getGalerieImageList();

    return new Response(JSON.stringify(imageData), {
        headers: { "Content-Type": "application/json" },
    });
};
