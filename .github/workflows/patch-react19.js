import fs from 'node:fs/promises';

const pkgText = await fs.readFile('./package.json', 'utf8');
const pkg = JSON.parse(pkgText);

pkg.devDependencies['@types/react'] = '^19.0.0';
pkg.devDependencies['@types/react-dom'] = '^19.0.0';
pkg.devDependencies.react = '^19.0.0';
pkg.devDependencies['react-dom'] = '^19.0.0';
pkg.overrides = {
  '@types/react': '^19.0.0',
  '@types/react-dom': '^19.0.0'
};

fs.writeFile('./package.json', JSON.stringify(pkg, null, 2));
