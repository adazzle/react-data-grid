var semver = require('semver');
fs = require('fs')
json = JSON.parse(fs.readFileSync('./packages/react-data-grid/package.json', 'utf8'))
process.stdout.write(json.version);
