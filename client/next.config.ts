const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "152.42.245.36",
        port: "1337",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
