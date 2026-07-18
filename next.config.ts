import type { NextConfig } from "next";

// Derive the backend hostname from the same env var the API client uses, so
// this stays correct across environments without a second place to update.
const backendHostname = (() => {
  try {
    return new URL(process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3002").hostname;
  } catch {
    return "localhost";
  }
})();

const nextConfig: NextConfig = {
  images: {
    // Previously `hostname: "**"` on both http and https — that turns the
    // built-in /_next/image optimizer into an open image proxy: anyone can
    // pass an arbitrary URL through it (including internal/private IPs), for
    // free bandwidth/CPU abuse or SSRF probing. Only the hosts this app
    // actually serves images from are allowed.
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: backendHostname },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
