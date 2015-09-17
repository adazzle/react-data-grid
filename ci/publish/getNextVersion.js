var semver = require('semver');
fs = require('fs')
json = JSON.parse(fs.readFileSync('./package.json', 'utf8'))
var execSync = require('child_process').execSync,
    child;

/**
 * Generates a new pre-release version based on current version and git branch name
 *
 * @param version - The currrent version of the package
 * @param branchName - The name of the current git branch
 * @returns nextVersion - The new version of the branch in the format major.minor.patch-branchName.x
 */
function getNextVersion(version, branchName, buildNumber){
  var nextVersion = semver.major(version) + "." + semver.minor(version) + "." + semver.patch(version) + "-" + branchName + buildNumber;
  if(semver.valid(nextVersion)){
    return nextVersion;
  } else{
    console.error(next + " is not a valid npm version");
  }
}

var nextVersion = getNextVersion(json.version, process.env.APPVEYOR_REPO_BRANCH, process.env.APPVEYOR_BUILD_NUMBER);
process.stdout.write(nextVersion);
