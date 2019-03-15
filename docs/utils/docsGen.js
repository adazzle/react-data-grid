const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const del = require('del');
const generateMarkdown = require('./generateMarkdown');
const generalUtils = require('./generalUtils');

// Configuration.
const apiDocsDir = './docs/api/';

const conf = {
  src: ['src'],
  apiDocsDir: apiDocsDir,
  apiDocsFilePath: apiDocsDir + 'docs.json',
  extension: ['js', 'jsx'],
  publicAPI: ['ReactDataGrid', 'Cell', 'Row'],
  ignoreDir: null,
  markdownDir: './docs/',
  docsIndexFilePath: './docs/readme.md'
};

function buildDocs(api) {
  try {
    const allDocPaths = [];
    mkdirp(conf.markdownDir);
    for (const filepath in api) {
      const name = generalUtils.getComponentName(filepath);
      const markdown = generateMarkdown(name, api[filepath]);

      if (markdown) {
        const docPath = conf.markdownDir + name + '.md';
        fs.writeFileSync(docPath, markdown);
        allDocPaths.push(docPath.slice(1));
      }
    }
  } catch (ex) {
    generalUtils.writeError(ex);
  }
}

function copyDocsToExamples() {
  mkdirp(conf.exampleDocsDir);
  fs.copy(conf.markdownDir, conf.exampleDocsDir, function(err) {
    if (err) {
      console.error(err);
    } else {
      console.log('Documents copied to examples!');
    }
  });
}

async function main() {
  // API
  await new Promise(function(resolve) {
    const res = {};
    generalUtils.traverseDir('packages/react-data-grid/src', res, function() {
      mkdirp.sync(path.dirname(conf.apiDocsFilePath));
      fs.writeFile(conf.apiDocsFilePath, JSON.stringify(res, null, 2), resolve);
    }, conf.publicAPI, conf.ignoreDir);
  });

  buildDocs(JSON.parse(fs.readFileSync(conf.apiDocsFilePath)));
}

main();
