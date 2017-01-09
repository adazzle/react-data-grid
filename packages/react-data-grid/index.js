var packageSrc;

try {
  packageSrc = require('./src');
} catch (ex) {
  packageSrc = require('./dist/react-data-grid');
}

module.exports = packageSrc;
