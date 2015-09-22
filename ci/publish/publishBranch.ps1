$nextVersion = node ./ci/publish/getNextVersion
git config --global credential.helper store
git config --global push.default simple
Add-Content "$env:USERPROFILE\.git-credentials" "https://$($env:access_token):x-oauth-basic@github.com`n"
git config --global user.name $env:APPVEYOR_REPO_COMMIT_AUTHOR
git config --global user.email $env:APPVEYOR_REPO_COMMIT_AUTHOR_EMAIL
git checkout $env:APPVEYOR_REPO_BRANCH
npm version $nextVersion --message "Version Bump : $($nextVersion) [ci skip]"
Write-Host "Publishing $($nextVersion) to npm"
if($?)
{
  npm publish . --tag $env:APPVEYOR_REPO_BRANCH
}

exit $lastexitcode
