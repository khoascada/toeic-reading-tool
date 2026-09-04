import bundleAnalyzer from '@next/bundle-analyzer';
import type { NextConfig } from 'next';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false, // Tắt tất cả development indicators (build activity, prerender indicators)
};

export default withBundleAnalyzer(nextConfig);
