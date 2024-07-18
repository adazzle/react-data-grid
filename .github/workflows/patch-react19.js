import fs from 'node:fs/promises';

const pkgText = await fs.readFile('./package.json', 'utf8');
const pkg = JSON.parse(pkgText);

pkg.devDependencies['@types/react'] = 'npm:types-react@rc';
pkg.devDependencies['@types/react-dom'] = 'npm:types-react-dom@rc';
pkg.devDependencies.react = 'rc';
pkg.devDependencies['react-dom'] = 'rc';
pkg.overrides = {
  '@types/react': 'npm:types-react@rc',
  '@types/react-dom': 'npm:types-react-dom@rc'
};

fs.writeFile('./package.json', JSON.stringify(pkg, null, 2));
