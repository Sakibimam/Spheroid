import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  compiler: {},
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {},
}

export default nextConfig
