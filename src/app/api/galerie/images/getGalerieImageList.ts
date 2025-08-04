import { copyFile, readdir, readFile, writeFile, mkdir, rm } from "fs/promises";
import { mimeTypeToFileExtension } from "../../upload/types";
import { ApiGaleryImagesResponse, ImageMetadata, StoredImageMetadata } from "./types";
import imageSize from "image-size";
import { ExifImage } from "exif";
import { Dirent } from "fs";
import { resolve } from "path";

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

const generateMetadata = async (imagePath: string, album = "Fotoupload"): Promise<ImageMetadata> => {
    const buffer = await readFile(imagePath);
    // const dimensions = imageSize(buffer);
    const imgSize = imageSize(buffer);
    let exif = null;
    try {
        exif = await getExif(buffer);
    } catch (error) {
        console.warn(`No EXIF data found for image ${imagePath}:`, error);
    }

    return {
        album,
        origin: null,
        tags: ["New"],
        description: "A New Image",
        exif: exif as { [key: string]: unknown } | null,
        imgSize
    };
};

/**
 * Old get galerie image list function
 * @deprecated
 * @returns List of images in the public/Galerie directory
 */
// async function oldGetGalerieImageList() {
//     // List all images in the public/Uploads directory
//     const basePath = "public";
//     const uploadsDir = "Galerie";
//     const thumbDir = "Galerie/thumb";
//     const images = (await readdir(`${basePath}/${uploadsDir}`, { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name));
//     const filteredImages = images.filter(
//         (file) => file.isFile() && Object.values(mimeTypeToFileExtension).some(ext => file.name.endsWith(ext))
//     ).map(file => file.name);

//     // Each image should have a json file with metadata in the same directory
//     // If the image has no metadata, create a default metadata object
//     const imageData: ApiGaleryImagesResponse = [];

//     await Promise.all(filteredImages.map(async (image) => {
//         const metadataPath = `${basePath}/${uploadsDir}/${image}.json`;
//         try {
//             const metadataFile = await readFile(metadataPath, "utf-8");
//             const metadata = JSON.parse(metadataFile);
//             imageData.push({
//                 image: `/${thumbDir}/${image}`,
//                 fullsize: `/${uploadsDir}/${image}`,
//                 metadata,
//             });
//         } catch (error) {
//             void error;
//             // If file doesn't exist or can't be read, generate new metadata and save it
//             const newMetadata = await generateMetadata(`${basePath}/${uploadsDir}/${image}`);
//             imageData.push({
//                 image: `/${uploadsDir}/${image}`,
//                 fullsize: `/${uploadsDir}/${image}`,
//                 metadata: newMetadata,
//             });
//             // Save the new metadata to a file
//             await writeFile(metadataPath, JSON.stringify(newMetadata, null, 2));
//             console.warn(`Metadata for image ${image} not found, generated new metadata.`);
//         }
//     }));

//     return imageData;
// }

// New get galerie image list function
// Albums should now be seperated by folders
// e.g. public/Galerie/Album1, public/Galerie/Album2
// Also the thums directory will not exist anymore, the images will be resized on the fly
// and served directly from the public/Galerie directory
// The metadata will be stored in the same directory as the image, e.g. public/Galerie/Album1/image.jpg.json
// The metadata will be striped of the album name
// All images directly in public/Galerie will automatically be put into the correct album based on the album field in the metadata
export async function getGalerieImageList() {
    const basePath = "public/Galerie";
    const fullBasePath = resolve(basePath);

    // List all images in the public/Galerie directory
    // This will include images in subdirectories as well
    const files = await readdir(basePath, { withFileTypes: true, recursive: true });
    const images = files.filter(
        (file) => file.isFile() && Object.values(mimeTypeToFileExtension).some(ext => file.name.endsWith(ext))
    );

    // Separate images into album directories and those without an album
    const albumImages: string[] = [];
    const noAlbumImages: Dirent[] = [];
    for (const file of images) {
        if (file.parentPath.replace(fullBasePath, "").includes('/')) {
            albumImages.push(`${file.parentPath}/${file.name}`);
        } else {
            noAlbumImages.push(file);
        }
    }
    // If there are images without an album directory, migrate them to dir-based albums
    // This will create a new album directory based on the album field in the metadata
    // and move the image to that directory
    if (noAlbumImages.length > 0) {
        console.warn("Found images without album directory, migrating to dir-based albums...");
        albumImages.push(...(
            (await migrateToDirBasedAlbums(noAlbumImages))
                .filter((i) => i !== undefined)
        ));
    }

    // Read metadata for each image in album directories
    const imageData: ApiGaleryImagesResponse = [];
    await Promise.all(albumImages.map(async (imagePath) => {
        const metadataPath = `${imagePath}.json`;
        try {
            const metadataFile = await readFile(metadataPath, "utf-8");
            const storedMetadata: StoredImageMetadata = JSON.parse(metadataFile);

            const albumName = imagePath.split('/').slice(-2, -1)[0]; // Get the album name from the path
            const metadata: ImageMetadata = {
                ...storedMetadata,
                album: albumName, // Set the album name
            };

            imageData.push({
                image: `/${imagePath.substring(7)}`,
                fullsize: `/${imagePath.substring(7)}`,
                metadata,
            });
        } catch (error) {
            void error;
            console.warn(`Metadata for image ${imagePath} not found, generating new metadata.`);
            const newMetadata = await generateMetadata(imagePath, imagePath.split('/').slice(-2, -1)[0]);
            imageData.push({
                image: `/${imagePath.substring(7)}`,
                fullsize: `/${imagePath.substring(7)}`,
                metadata: newMetadata,
            });
            // Save the new metadata to a file
            await writeFile(metadataPath, JSON.stringify(newMetadata, null, 2));
        }
    }));
    return imageData;
}

// Read metadata for each image
// If metadata has album field, move image to the corresponding album directory
// If album directory does not exist, create it
// Update metadata to remove album field
// Save updated metadata back to the image's directory
function migrateToDirBasedAlbums(images: Dirent[]) {
    return Promise.all(images.map(async (image) => {
        const fullImagePath = `public/Galerie/${image.name}`;
        const metadataPath = `public/Galerie/${image.name}.json`;
        try {
            const metadataFile = await readFile(metadataPath, "utf-8");
            const metadata = JSON.parse(metadataFile);
            if (metadata.album) {
                const albumDir = `public/Galerie/${metadata.album}`;
                const newImagePath = `${albumDir}/${image.name}`;
                const newMetadataPath = `${albumDir}/${image.name}.json`;
                // Ensure album directory exists
                try {
                    await readdir(albumDir);
                } catch {
                    await mkdir(albumDir, { recursive: true });
                }
                // Update metadata
                delete metadata.album;

                // Write updated metadata and move image to album directory
                await Promise.all([
                    // Save updated metadata
                    writeFile(newMetadataPath, JSON.stringify(metadata, null, 2))
                        // Remove old metadata file
                        .then(() => rm(metadataPath)),
                    // Copy image to album directory
                    copyFile(fullImagePath, newImagePath)
                        // Remove old image file
                        .then(() => rm(fullImagePath))
                ]);
                console.log(`Moved image ${image.name} to album ${metadata.album}`);
                // Return the new image path for the response
                return newImagePath;
            }
        } catch (error) {
            console.warn(`Error processing image ${image.name}:`, error);
        }
    }));
}