const esbuild = require('esbuild');
const { nodeExternalsPlugin } = require('esbuild-node-externals');
const autoprefixer = require('autoprefixer');
const postCssPlugin = require('@deanc/esbuild-plugin-postcss');

esbuild
  .build({
    entryPoints: ['src/index.ts'],
    outdir: 'dist',
    allowOverwrite: true,
    bundle: true,
    platform: 'node',
    sourcemap: true,
    target: ['chrome91', 'edge90', 'firefox90', 'safari13'],
    plugins: [
      nodeExternalsPlugin(),
      postCssPlugin({
        plugins: [
          require('postcss-preset-env')({
            stage: 3,
            features: {
              'nesting-rules': true,
            },
          }),
          require('autoprefixer'),
        ],
      }),
    ],
  })
  .catch(() => process.exit(1));
