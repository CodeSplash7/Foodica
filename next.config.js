module.exports = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/blogs?page=1",
        permanent: true
      }
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "files.edgestore.dev",
        port: "",
        pathname: "**"
      }
    ]
  }
};
