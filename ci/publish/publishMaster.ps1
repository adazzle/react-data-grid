Write-Host "Merging to master. Attempting to bump version"
git config --global credential.helper store
git config --global push.default simple
Add-Content "$env:USERPROFILE\.git-credentials" "https://$($env:access_token):x-oauth-basic@github.com`n"
git config --global user.name $env:APPVEYOR_REPO_COMMIT_AUTHOR
git config --global user.email $env:APPVEYOR_REPO_COMMIT_AUTHOR_EMAIL
git checkout master
gulp docs:regenerate
git add -A
git commit -m "Docs Regeneration"
npm version patch --message "Version Bump [ci skip]"
$currentVersion = node ./ci/publish/getCurrentVersion
git commit --amend -m "Version Bump to $($currentVersion) [ci skip]"
git fetch
git pull --rebase
git push
git push --tags
Write-Host "Publishing $($currentVersion) to npm"
if($?)
{
  npm publish
  if($?){
    Write-Host "regenerating public site and examples"
    gulp docs
  }
}

exit $lastexitcode
