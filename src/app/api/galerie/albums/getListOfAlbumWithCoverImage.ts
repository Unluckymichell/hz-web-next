import { readdir, readFile } from "fs/promises";
import { ApiGaleryAlbumsResponse } from "./types";
import { mimeTypeToFileExtension } from "../../upload/types";

// async function oldGetListOfAlbumWithCoverImage() {
//     // List all images in the public/Uploads directory
//     const basePath = "public";
//     const uploadsDir = "Galerie";
//     const thumbDir = "Galerie/thumb";
//     const images = (await readdir(`${basePath}/${uploadsDir}`, { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name));

//     const filteredImageMetadatas = images.filter(
//         (file) => file.isFile() && file.name.endsWith(".json")
//     ).map(file => file.name);

//     // Each image should have a json file with metadata in the same directory
//     // If the image has no metadata, create a default metadata object
//     const imageData: ApiGaleryAlbumsResponse = {};

//     await Promise.all(filteredImageMetadatas.map(async (imageMeta) => {
//         const metadataPath = `${basePath}/${uploadsDir}/${imageMeta}`;
//         try {
//             const metadataFile = await readFile(metadataPath, "utf-8");
//             const metadata = JSON.parse(metadataFile);
//             imageData[metadata.album] = {
//                 image: `/${thumbDir}/${imageMeta.replace(".json", "")}`,
//                 fullsize: `/${uploadsDir}/${imageMeta.replace(".json", "")}`,
//                 metadata,
//             };
//         } catch (error) {
//             console.error(`Error reading metadata for ${imageMeta}:`, error);
//         }
//     }));

//     return imageData;
// }

export async function getListOfAlbumWithCoverImage(): Promise<ApiGaleryAlbumsResponse> {
    const dirs = await readdir("public/Galerie", { withFileTypes: true })
        .then(files => files.filter(file => file.isDirectory()));
    
    const albumPromises = dirs.map(async (dir) => {
        const albumName = dir.name;
        // Cover is the first image in the album
        const coverImage = await readdir(`public/Galerie/${albumName}`, { withFileTypes: true })
            .then(files => 
                files.filter(file => 
                    file.isFile() && 
                    Object.values(mimeTypeToFileExtension).some(ext => file.name.endsWith(ext))
                )
            );
        
        const coverImagePath = coverImage.length > 0 ? `/${albumName}/${coverImage[0].name}` : null;
        
        // Read metadata for the cover image if it exists
        let metadata = null;
        if (coverImagePath) {
            const metadataPath = `public/Galerie/${albumName}/${coverImage[0].name}.json`;
            try {
                const metadataFile = await readFile(metadataPath, "utf-8");
                metadata = JSON.parse(metadataFile);
                // You can process metadata here if needed
            } catch (error) {
                console.warn(`No metadata found for cover image ${coverImagePath}:`, error);
            }
        }

        return {
            album: albumName,
            coverImage: `/Galerie${coverImagePath}`,
            metadata,
        };
    });

    return new Promise<ApiGaleryAlbumsResponse>(async (resolve, reject) => {
        try {
            const albums = await Promise.all(albumPromises);
            const albumData: ApiGaleryAlbumsResponse = {};
            albums.forEach(album => {
                if(!album.coverImage) return; // Skip albums without cover images
                albumData[album.album] = {
                    image: album.coverImage,
                    fullsize: album.coverImage,
                    metadata: album.metadata, // Metadata can be added later if needed
                };
            });
            resolve(albumData);
        } catch (error) {
            console.error("Error fetching album data:", error);
            reject(error);
        }
    });
}
