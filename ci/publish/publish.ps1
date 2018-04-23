function Show-Menu
{
     param (
           [string]$Title = 'React Data Grid Publish Options'
     )
     cls
     Write-Host "================ $Title ================"
     
     Write-Host "Major Release: Press '1' for this option."
     Write-Host "Minor Release: Press '2' for this option."
     Write-Host "Patch Release: Press '3' for this option."
     Write-Host "Q: Press 'Q' to quit."
}

do
{
     Show-Menu
     $input = Read-Host "Please choose a version type to publish"
     switch ($input)
     {
           '1' {
            $nextVersion = node ./ci/publish/getNextVersion major
            Write-Host "Attempting to publishing new major version $($nextVersion) to npm"
           } '2' {
            $nextVersion = node ./ci/publish/getNextVersion minor
                Write-Host "Attempting to publishing new minor version $($nextVersion) to npm"
           } '3' {
            $nextVersion = node ./ci/publish/getNextVersion patch
                Write-Host "Attempting to publishing new patch version $($nextVersion) to npm"
           } 'q' {
                return
           }
     }
     pause
}
until ($input -eq 'q' -Or $input -eq '1' -Or $input -eq '2' -Or $input -eq '3')

Write-Host "Installing dependencies before publish"
npm install

$authorisedUser = "adazzle"
$currentUser = npm whoami --silent | Select-String -Pattern $authorisedUser
If("$(${currentUser})" -ne $AuthorisedUser) {
  Write-Host "In order to publish, you must be logged in to npm with username adazzle"
  npm adduser
  $currentUser = npm whoami --silent | Select-String -Pattern $authorisedUser
}

Write-Host "Preparing to publish with user $(${currentUser})"

npm run build
if($?)
{
  $versionBumpMessage = "Version bump to $nextVersion [ci skip]"

  ./node_modules/.bin/lerna publish --repo-version $nextVersion  --skip-git --yes
  if($?) {
    Write-Host "Regenerating public site and examples"
    node ./ci/publish/publishExamples.js
  }
  git add .
  git commit -m $versionBumpMessage
  git push
}

exit $lastexitcode
