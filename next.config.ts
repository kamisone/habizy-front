import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  env: {
    API_BASE_URL_BROWSER: process.env.API_BASE_URL_BROWSER,
    API_BASE_URL_SERVER: process.env.API_BASE_URL_SERVER,
    NEXT_API_BASE_URL_BROWSER: process.env.NEXT_API_BASE_URL_BROWSER,
  },
};

export default nextConfig;
