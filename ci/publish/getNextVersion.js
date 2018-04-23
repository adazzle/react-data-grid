const semver = require('semver');
fs = require('fs');
json = JSON.parse(fs.readFileSync('./packages/react-data-grid/package.json', 'utf8'));
const scriptArgs = process.argv.slice(2);

const getNextVersion = () => {
  const currentVersion = json.version;
  return semver.inc(currentVersion, scriptArgs[0]);
};

process.stdout.write(getNextVersion());
