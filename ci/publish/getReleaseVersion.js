const semver = require('semver');
fs = require('fs');
json = JSON.parse(fs.readFileSync('./packages/react-data-grid/package.json', 'utf8'));

const getReleasVersion = () => {
  const currentVersion = json.version;
  const pathVersion = semver.patch(currentVersion) + 1;
  const nextVersion = semver.major(currentVersion) + '.' + semver.minor(currentVersion) + '.' + pathVersion;
  if (semver.valid(nextVersion)) {
    return nextVersion;
  } else {
    console.error(nextVersion + ' is not a valid npm version');
  }
};

process.stdout.write(getReleasVersion());
