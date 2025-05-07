import { build } from 'esbuild';
import { rm } from 'fs/promises';
import pkg from "./package.json";

await rm("dist", { force: true, recursive: true });

build({
  entryPoints: ['index.js'],
  format: "esm",
  bundle: true,
  outfile: 'dist/index.js',
  platform: 'node',
  // target: 'node18',
  sourcemap: true,
  external: Object.keys(pkg.dependencies),
}).then(() => {
  console.log('Build completed successfully');
}).catch(() => process.exit(1));
