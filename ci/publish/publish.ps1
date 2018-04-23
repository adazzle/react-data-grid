$Version = Read-Host -Prompt 'Enter semver version you would like to publish'
npm install
npm run build
if($?)
{
  Write-Host "Publishing $($Version) to npm"
  $versionBumpMessage = "Version bump to $($Version) [ci skip]"

  ./node_modules/.bin/lerna publish --repo-version $Version  --skip-git --yes
  if($?) {
    Write-Host "Regenerating public site and examples"
    node ./ci/publish/publishExamples.js
  }
  git add .
  git commit -m $versionBumpMessage
  git push
}

exit $lastexitcode
