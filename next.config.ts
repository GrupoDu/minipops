import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: "/",
        destination: "/login",
        permanent: true,
      },
    ];
  },
  allowedDevOrigins: ["192.168.1.10"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hlzfhmneaphariqoewir.storage.supabase.co",
      },
    ],
  },
};

export default nextConfig;
