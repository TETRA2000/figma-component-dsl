import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    include: ['packages/*/src/**/*.test.ts'],
  },
  resolve: {
    alias: {
      '@figma-dsl/core': path.resolve(__dirname, 'packages/dsl-core/src/index.ts'),
      '@figma-dsl/compiler': path.resolve(__dirname, 'packages/compiler/src/index.ts'),
      '@figma-dsl/renderer': path.resolve(__dirname, 'packages/renderer/src/index.ts'),
      '@figma-dsl/capturer': path.resolve(__dirname, 'packages/capturer/src/index.ts'),
      '@figma-dsl/comparator': path.resolve(__dirname, 'packages/comparator/src/index.ts'),
      '@figma-dsl/exporter': path.resolve(__dirname, 'packages/exporter/src/index.ts'),
      '@figma-dsl/validator': path.resolve(__dirname, 'packages/validator/src/index.ts'),
      '@figma-dsl/react-to-dsl': path.resolve(__dirname, 'packages/react-to-dsl/src/index.ts'),
    },
  },
});
