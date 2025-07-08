import { getListOfAlbumWithCoverImage } from "./getListOfAlbumWithCoverImage";

export const GET = async () => {
    const imageData = await getListOfAlbumWithCoverImage();

    return new Response(JSON.stringify(imageData), {
        headers: { "Content-Type": "application/json" },
    });
};
