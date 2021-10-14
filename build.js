const esbuild = require('esbuild');
const { nodeExternalsPlugin } = require('esbuild-node-externals');
const autoprefixer = require('autoprefixer');
const postCssPlugin = require('@deanc/esbuild-plugin-postcss');
const postCssConfig = require('./postcss.config');

esbuild
  .build({
    entryPoints: ['src/index.ts'],
    outdir: 'dist',
    allowOverwrite: true,
    bundle: true,
    platform: 'node',
    sourcemap: true,
    target: ['chrome91', 'edge90', 'firefox90', 'safari13'],
    plugins: [nodeExternalsPlugin(), postCssPlugin(postCssConfig)],
  })
  .catch(() => process.exit(1));
