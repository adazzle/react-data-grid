const fs = require('fs');
const path = require('path');
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

async function main() {
  // API
  await new Promise(function(resolve) {
    const res = {};
    generalUtils.traverseDir('packages/react-data-grid/src', res, function() {
      fs.writeFile(conf.apiDocsFilePath, JSON.stringify(res, null, 2), resolve);
    }, conf.publicAPI, conf.ignoreDir);
  });

  buildDocs(JSON.parse(fs.readFileSync(conf.apiDocsFilePath)));
}

main();
