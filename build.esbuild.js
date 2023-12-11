const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

// Chemin du dossier contenant les fichiers TypeScript
const folderPath = './bundle';

// Lire tous les fichiers dans le dossier
fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error('Erreur lors de la lecture du dossier:', err);
    return;
  }



  files.forEach(file => {
    if (path.extname(file) === '.ts') {
      const config = {
        entryPoints: [path.join(folderPath, file)],
        outfile: `./bundle/${file.replace('.ts', '.js')}`,
        bundle: true,
        platform: 'node',
        format: 'cjs',
        plugins: [{
          name: 'rebuild-notify',
          setup(build) {
            build.onEnd(result => {
              console.log(`build ended with ${result.errors.length} errors`);
              // HERE: somehow restart the server from here, e.g., by sending a signal that you trap and react to inside the server.
            })
          },
        }]
      }

      // // Compiler chaque fichier TypeScript
      esbuild.build(config).catch(() => process.exit(1));

      // const run = async () => {
      //   const ctx = await esbuild.context(config);
      //   await ctx.watch();
      // };

      // run();
    }
  });
});
