var dir = require('node-dir');
var DocGen = require('react-docgen');
var path = require('path');

function writeError(error) {
  console.log(error);
}

function traverseDir(transversePath, result, done, extension, ignoreDir) {
  var extensions = new RegExp('\\.(?:' + extension.join('|') + ')$');
  dir.readFiles(
    transversePath,
    {
      match: extensions,
      excludeDir: ignoreDir
    },
    function(error, content, filename, next) {
      if (error) {
        exitWithError(error);
      }
      try {
        result[filename] = DocGen.parse(content);
      } catch (ex) {
        writeError(ex, filename);
      }
      next();
    },
    function(error) {
      if (error) {
        writeError(error);
      }
      done();
    }
  );
}

function getComponentName(filepath) {
  var name = path.basename(filepath);
  var ext;
  while ((ext = path.extname(name))) {
    name = name.substring(0, name.length - ext.length);
  }
  return name;
}

module.exports = {
  writeError: writeError,
  traverseDir: traverseDir,
  getComponentName: getComponentName
};
