import { readdir, readFile } from "fs/promises";
import { ApiGaleryAlbumsResponse } from "./types";

export async function getListOfAlbumWithCoverImage() {
    // List all images in the public/Uploads directory
    const basePath = "public";
    const uploadsDir = "Galerie";
    const thumbDir = "Galerie/thumb";
    const images = (await readdir(`${basePath}/${uploadsDir}`, { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name));

    const filteredImageMetadatas = images.filter(
        (file) => file.isFile() && file.name.endsWith(".json")
    ).map(file => file.name);

    // Each image should have a json file with metadata in the same directory
    // If the image has no metadata, create a default metadata object
    const imageData: ApiGaleryAlbumsResponse = {};

    await Promise.all(filteredImageMetadatas.map(async (imageMeta) => {
        const metadataPath = `${basePath}/${uploadsDir}/${imageMeta}`;
        try {
            const metadataFile = await readFile(metadataPath, "utf-8");
            const metadata = JSON.parse(metadataFile);
            imageData[metadata.album] = {
                image: `/${thumbDir}/${imageMeta.replace(".json", "")}`,
                fullsize: `/${uploadsDir}/${imageMeta.replace(".json", "")}`,
                metadata,
            };
        } catch (error) {
            console.error(`Error reading metadata for ${imageMeta}:`, error);
        }
    }));

    return imageData;
}
