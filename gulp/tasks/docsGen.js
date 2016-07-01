var gulp = require('gulp');
var fs = require('fs-extra');
var generateMarkdown = require('../../docs/utils/generateMarkdown');
var path = require('path');
var mkdirp = require('mkdirp');
var generalUtils = require('../../docs/utils/generalUtils');
var del = require('del');
var runSequence = require('run-sequence');

// Configuration.
var apiDocsDir = './docs/api/';

var conf = {
  src: ['src'],
  apiDocsDir: apiDocsDir,
  apiDocsFilePath: apiDocsDir + 'docs.json',
  extension: ['js', 'jsx'],
  ignoreDir: null,
  markdownDir: './docs/markdowns/',
  exampleDocsDir: './examples/docs/markdowns/',
  docsIndexFilePath: './docs/readme.md',
  docsExamplesFilePath: './examples/assets/js/docs.js'
};

// Builders.
function createDocumentContainerPages(docs) {
  var markdown = '# API Docs\n';
  var documentsList = [];

  for (var i = 0; i < docs.length; i++) {
    var file = docs[i];
    var fileName = generalUtils.getComponentName(file);

    markdown += '- [' + fileName + '](' + file + ')\n';
    documentsList.push({
      name: fileName,
      path: '.' + file
    });
  }

  fs.writeFileSync(conf.docsExamplesFilePath, 'var generatedDocs = ' + JSON.stringify(documentsList));
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

    createDocumentContainerPages(allDocPaths);
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
var task = gulp.task('docs:markdown', function(done) {
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

task = gulp.task('docs:create', ['docs:api'], function(done) {
  runSequence(['docs:markdown'], function() {
    done();
  });
});

var docsToClean = [conf.apiDocsDir, conf.markdownDir];
task = gulp.task('docs:clean',  del.bind(null, docsToClean));

task = gulp.task('docs:regenerate', ['docs:clean'], function(done) {
  runSequence(['docs:create'], function() {
    done();
    copyDocsToExamples();
  });
});

module.exports = task;
