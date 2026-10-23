import type {NextConfig} from 'next'
const domain: string = process.env.VERCEL_URL ?? 'localhost:3000'
const url: string = `http${domain === 'localhost:3000' ? '' : 's'}://${domain}`
const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_DOMAIN: url,
    NEXT_PUBLIC_API_DOMAIN: `${url}/api`,
    BETTER_AUTH_URL: url,
    BETTER_AUTH_SECRET: process.env.NODE_ENV === 'development' ? 'd3v3l0pm3nt53cr3tk3yn0t53cur3@t@11n3v3ru53!npr0duct!0n3v3r!!!' : process.env.AUTH_SECRET
  },
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: 'lh3.googleusercontent.com',
      pathname: '**'
    }, {
      protocol: 'https',
      hostname: 'res.cloudinary.com',
      pathname: '**'
    }]
  },
  output: process.env.VERCEL_URL ? undefined : 'standalone',
  reactStrictMode: true,
  generateBuildId: (): string => `property-pulse-web-${Date.now()}`,
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      '*.css': {
        loaders: [
          '@tailwindcss/turbopack'
        ],
        as: '*.css'
      }
    }
  },
  experimental: {
    authInterrupts: true
  }
}
export default nextConfig