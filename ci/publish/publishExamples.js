const ghpages = require('gh-pages');
const path = require('path');
const copydir = require('copy-dir');
const fs = require('fs');

const copyDistFolder = () => {
  const srcDistPath = path.join(__dirname, '../../packages/react-data-grid-examples/src/dist');

  try {
    fs.mkdirSync(srcDistPath);
  } catch (e) {
    if ( e.code !== 'EEXIST' ) throw e;
  }

  copydir.sync(
    path.join(__dirname, '../../packages/react-data-grid-examples/dist'),
    srcDistPath);
};

const publishToGhPages = () => {
  ghpages.publish(
    path.join(__dirname, '../../packages/react-data-grid-examples/src'),
    (err) => {
      if (err) throw new Error(err);
    }
  );
};

copyDistFolder();
publishToGhPages();
