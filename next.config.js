module.exports = {
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/blogs/1',
      },
    ]
  },
}