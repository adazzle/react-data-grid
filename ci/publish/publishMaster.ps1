npm run build
if($?)
{
  Write-Host "Publishing $($releaseVersion) to npm"
  $versionBumpMessage = "Version bump to $($releaseVersion) [ci skip]"

  ./node_modules/.bin/lerna publish --repo-version 4.0.0  --skip-git --yes
  if($?) {
    Write-Host "Regenerating public site and examples"
    node ./ci/publish/publishExamples.js
  }
  git add .
  git commit -m $versionBumpMessage
  git push
}

exit $lastexitcode
