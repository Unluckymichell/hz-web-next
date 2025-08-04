import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: "standalone",
    images: {
        minimumCacheTTL: 600,
    }
};

export default nextConfig;
