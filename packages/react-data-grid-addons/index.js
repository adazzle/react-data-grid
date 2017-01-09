var packageSrc;

try {
  packageSrc = require('./src');
} catch (ex) {
  packageSrc = require('./dist/react-data-grid-addons');
}

module.exports = packageSrc;
