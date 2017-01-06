const nodeEnv = process.env.NODE_ENV;
if (nodeEnv === 'webpack-dev-server' || nodeEnv === 'tests') {
  module.exports = require('./src');
} else {
  module.exports = require('./dist/react-data-grid-addons');
}
