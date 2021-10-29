// Don't run this file manually, use `npm run emi:build` or `npm run emi:build:linux`.
const COMPILED_NAME = 'Server.exe';

/* eslint-disable @typescript-eslint/no-var-requires */
const { exec } = require('pkg');
const fs = require('fs-extra');
const chalk = require('chalk');

// Build process ------------------------------

if (!fs.existsSync('build')) {
  console.log(chalk.blue('creating build/...'));
  fs.mkdirSync('build');
}

console.log(chalk.blue('compiling executable...'));
(async () => {
  await exec([
    'dist/src/main.js',
    '--target',
    'host',
    '--output',
    `build/${COMPILED_NAME}`,
  ]);

  console.log(chalk.green(`compiled server to: build/${COMPILED_NAME}`));

  // I should find a better way to do this.
  console.log(chalk.blue('copying dist/* to build/...'));
  fs.copy('dist/', 'build/', function (err) {
    if (err) return console.error(err);
    console.log(chalk.green('... done'));

    console.log(chalk.blue('copying profiles/ to build/...'));
    fs.copy('profiles/', 'build/profiles', function (err) {
      if (err) return console.error(err);
      console.log(chalk.green('... done'));

      console.log(chalk.blue('copying misc/ to build/...'));
      fs.copy('misc/', 'build/misc', function (err) {
        if (err) return console.error(err);
        console.log(chalk.green('... done'));

        console.log(chalk.blue('copying database/ to build/...'));
        fs.copy('database/', 'build/database', function (err) {
          if (err) return console.error(err);
          console.log(chalk.green('... done'));

          console.log(chalk.green('all done copying!'));

          console.log(chalk.blue('replacing icon...'));

          // This doesn't seem to work yet
          const { exec } = require('child_process');
          exec(
            'start dev/ResourceHacker.exe -addoverwrite "build/Server.exe", "build/Server.exe", "iconset.ico", ICONGROUP, MAINICON, 0',
            (error, stdout, stderr) => {
              if (error) {
                console.log(chalk.red(`error: ${error.message}`));
                return;
              }
              if (stderr) {
                console.log(chalk.red(`stderr: ${stderr}`));
                return;
              }
              console.log(chalk.blue(`stdout: ${stdout}`));
              console.log(chalk.green('... done'));
              console.log(chalk.green('==> build finished!'));
            },
          );
        });
      });
    });
  });
})();
