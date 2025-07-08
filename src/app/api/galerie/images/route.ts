import { getGalerieImageList } from "./getGalerieImageList";

export const GET = async () => {
    const imageData = await getGalerieImageList();

    return new Response(JSON.stringify(imageData), {
        headers: { "Content-Type": "application/json" },
    });
};
