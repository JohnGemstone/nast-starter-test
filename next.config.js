/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    webpackBuildWorker: true
  },
  // Avoid build error: JavaScript heap out of memory
  // https://github.com/vercel/next.js/issues/32314
  //
  // eslint:{
  //   ignoreDuringBuilds:true
  // },
  //
  typescript:{
    ignoreBuildErrors:true
  }
}

module.exports = nextConfig
