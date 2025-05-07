const { build } = require('esbuild');
const fs = require('fs/promises');

fs.rm("dist", { force: true, recursive: true });

build({
  entryPoints: ['index.js'],
  bundle: true,
  outfile: 'dist/index.js',
  platform: 'node',
  target: 'node18',
  sourcemap: true,
}).then(() => {
  console.log('Build completed successfully');
}).catch(() => process.exit(1));
