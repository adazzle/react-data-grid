var semver = require('semver');
fs = require('fs');
json = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
var execSync = require('child_process').execSync,
    child;


function bumpVersion(version) {
  return semver.inc(version, 'patch');
}

var bumpVersion = bumpVersion(json.version);
process.stdout.write(bumpVersion);
