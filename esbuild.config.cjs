const esbuild = require('esbuild');
const { rm } = require('fs/promises');
const pkg = require("./package.json");

(async () => {
  await rm("dist", { force: true, recursive: true });

  esbuild.build({
    entryPoints: ['index.js'],
    format: "cjs",
    bundle: true,
    outfile: 'dist/index.cjs',
    platform: 'node',
    sourcemap: true,
    external: Object.keys(pkg.dependencies),
  }).then(() => {
    console.log('Build completed successfully');
  }).catch(() => process.exit(1));
})();
