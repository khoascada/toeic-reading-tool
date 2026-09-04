import path from 'node:path';
import type { StorybookConfig } from '@storybook/react-vite';
import tsconfigPaths from 'vite-tsconfig-paths';

const config: StorybookConfig = {
  stories: [
    '../components/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../app/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-links',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  staticDirs: ['../public'],
  async viteFinal(config) {
    const { mergeConfig } = await import('vite');
    return mergeConfig(config, {
      plugins: [tsconfigPaths()],
      define: {
        'process.env': {},
      },
      resolve: {
        alias: {
          '@lib': path.resolve(__dirname, '../lib'),
          '@components': path.resolve(__dirname, '../components'),
          '@services': path.resolve(__dirname, '../services'),
          '@styles': path.resolve(__dirname, '../styles'),
          '@features': path.resolve(__dirname, '../features'),
          '@public': path.resolve(__dirname, '../public'),
          '@': path.resolve(__dirname, '..'),
          '@types': path.resolve(__dirname, '../types'),
        },
      },
    });
  },
};

export default config;
