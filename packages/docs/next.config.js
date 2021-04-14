module.exports = {
  poweredByHeader: false,
  reactStrictMode: true,
  future: {
    webpack5: true,
  },
  serverRuntimeConfig: {
    docsUrl: process.env.DOCS_URL ?? `http://0.0.0.0:3000/docs/json`,
  },
}
