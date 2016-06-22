var gulp = require('gulp');
var fs = require('fs');
var generateMarkdown = require('../../docs/utils/generateMarkdown');
var path = require('path');
var mkdirp = require('mkdirp');
var generalUtils = require('../../docs/utils/generalUtils');
var del = require('del');

// Configuration.
var apiDocsDir = './docs/api/';

var conf = {
  src: ['src'],
  apiDocsDir: apiDocsDir,
  apiDocsFilePath: apiDocsDir + 'docs.json',
  extension: ['js', 'jsx'],
  ignoreDir: null,
  markdownDir: './docs/markdowns/',
  docsIndexFilePath: './docs/readme.md'
};

// Builders.
function createIndexPage(docs) {
  var markdown = '# API Docs\n';
  for (var i = 0; i < docs.length; i++) {
    var file = docs[i];
    markdown += '- [' + generalUtils.getComponentName(file) + '](' + file + ')\n';
  }

  fs.writeFileSync(conf.docsIndexFilePath, markdown);
}

function buildDocs(api) {
  try {
    var allDocPaths = [];
    mkdirp(conf.markdownDir);
    for (var filepath in api) {
      var name = generalUtils.getComponentName(filepath);
      var markdown = generateMarkdown(name, api[filepath]);

      if (markdown) {
        var docPath = conf.markdownDir + name + '.md';
        fs.writeFileSync(docPath, markdown);
        allDocPaths.push(docPath.slice(1));
      }
    }

    createIndexPage(allDocPaths);
  } catch (ex) {
    generalUtils.writeError(ex);
  }
}

// Tasks.
var task = gulp.task('docs:markdown', ['docs:api'], function(done) {
  buildDocs(JSON.parse(fs.readFileSync(conf.apiDocsFilePath)));
  done();
});

task = gulp.task('docs:api', function(done) {
  var res = {};
  generalUtils.traverseDir('src', res, function() {
    mkdirp.sync(path.dirname(conf.apiDocsFilePath));
    fs.writeFile(conf.apiDocsFilePath, JSON.stringify(res, null, 2), done);
  }, conf.extension, conf.ignoreDir);
});

var docsToClean = [conf.apiDocsDir, conf.markdownDir];
task = gulp.task('docs:clean',  del.bind(null, docsToClean));

task = gulp.task('docs:regenerate', ['docs:clean', 'docs:markdown']);

module.exports = task;
