const esbuild = require('esbuild');
const { nodeExternalsPlugin } = require('esbuild-node-externals');

esbuild
  .build({
    entryPoints: ['src/index.ts'],
    outdir: 'dist',
    allowOverwrite: true,
    bundle: true,
    platform: 'node',
    sourcemap: true,
    target: ['chrome91', 'edge90', 'firefox90', 'safari13'],
    plugins: [nodeExternalsPlugin()],
  })
  .catch(() => process.exit(1));
