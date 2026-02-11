/** @type {import("next").NextConfig} */
const nextConfig = {
  turbopack: {
    // Keep Next from trying to treat C:\Users\Andy as the workspace root
    root: "C:\\Users\\Andy\\andysd-suite"
  }
};

export default nextConfig;
