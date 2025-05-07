const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['src/index.js'],
  bundle: true,
  outfile: 'dist/bundle.js',
  platform: 'node',
  target: 'node14',
  sourcemap: true,
}).catch(() => process.exit(1));
