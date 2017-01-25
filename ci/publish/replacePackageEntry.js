const fs = require('fs');
const path = require('path');
const scriptArgs = process.argv.slice(2);
const packageName = scriptArgs[0];
const publish = scriptArgs[1];

const getPathToPackageEntry = () => path.join(__dirname, `../../packages/${packageName}/index.js`);
const getPublishEntryData = () => `module.exports = require('./dist/${packageName}');`;
const getDevEntryData = () => "module.exports = require('./src');";

const replacePackageEntry = () => {
  const entryData = publish ? getPublishEntryData() : getDevEntryData();
  console.log(` --- Overriding ${packageName} entry point ---`);
  fs.writeFile(
    getPathToPackageEntry(),
    entryData,
    (err) => {
      if (err) throw new Error(errr);
      const env = publish ? 'publish' : 'dev';
      console.log(` --- ${packageName} entry point was overriden to ${env}`);
    }
  );
};

replacePackageEntry();
