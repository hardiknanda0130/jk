/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  reactStrictMode: false,       // 👈 static out build
  trailingSlash: true,     // 👈 pages properly open hon
  images: {
    unoptimized: true,     // 👈 images out folder me aaye
  },
};

export default nextConfig;