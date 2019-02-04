const gulp = require('gulp');
const fs = require('fs-extra');
const generateMarkdown = require('../../docs/utils/generateMarkdown');
const path = require('path');
const mkdirp = require('mkdirp');
const generalUtils = require('../../docs/utils/generalUtils');
const del = require('del');
const runSequence = require('run-sequence');

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

// Tasks.
let task = gulp.task('docs:markdown', function(done) {
  buildDocs(JSON.parse(fs.readFileSync(conf.apiDocsFilePath)));
  done();
});

task = gulp.task('docs:api', function(done) {
  const res = {};
  generalUtils.traverseDir('packages/react-data-grid/src', res, function() {
    mkdirp.sync(path.dirname(conf.apiDocsFilePath));
    fs.writeFile(conf.apiDocsFilePath, JSON.stringify(res, null, 2), done);
  }, conf.publicAPI, conf.ignoreDir);
});

task = gulp.task('docs:create', ['docs:api'], function(done) {
  runSequence(['docs:markdown'], function() {
    done();
  });
});

const docsToClean = [conf.apiDocsDir, conf.markdownDir];
task = gulp.task('docs:clean',  del.bind(null, docsToClean));

task = gulp.task('docs:regenerate', ['docs:clean'], function(done) {
  runSequence(['docs:create'], function() {
    done();
    copyDocsToExamples();
  });
});

module.exports = task;
