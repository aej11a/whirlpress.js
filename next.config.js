/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "myblog2700.files.wordpress.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "secure.gravatar.com",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
