$major = node ./ci/publish/getNextVersion major
$minor = node ./ci/publish/getNextVersion minor
$patch = node ./ci/publish/getNextVersion patch
$premajor = node ./ci/publish/getNextVersion premajor
$preminor = node ./ci/publish/getNextVersion preminor
$prepatch = node ./ci/publish/getNextVersion prepatch
$prerelease = node ./ci/publish/getNextVersion prerelease

function Show-Menu
{
     param (
           [string]$Title = 'React Data Grid Publish Options'
     )
     cls
     Write-Host "================ $Title ================"
     
     Write-Host "Major Release -> $($major) Press '1' for this option."
     Write-Host "Minor Release -> $($minor)  Press '2' for this option."
     Write-Host "Patch Release -> $($patch) Press '3' for this option."
     Write-Host "Premajor Release -> $($premajor) Press '4' for this option."
     Write-Host "Preminor Release -> $($preminor) Press '5' for this option."
     Write-Host "Prepatch Release -> $($prepatch) Press '6' for this option."
     Write-Host "Prerelease -> $($prerelease) Press '7' for this option."
     Write-Host "Q: Press 'Q' to quit."
}

do
{
     Show-Menu
     $input = Read-Host "Please choose a version type to publish"
     switch ($input)
     {
           '1' {
            $nextVersion = $major
            Write-Host "Attempting to publishing new major version $($nextVersion) to npm"
           } '2' {
            $nextVersion =$minor
                Write-Host "Attempting to publishing new minor version $($nextVersion) to npm"
           } '3' {
            $nextVersion = $patch
                Write-Host "Attempting to publishing new patch version $($nextVersion) to npm"
           }'4' {
            $nextVersion = $premajor
                Write-Host "Attempting to publishing new premajor version $($nextVersion) to npm"
           } '5' {
            $nextVersion = $preminor
                Write-Host "Attempting to publishing new preminor version $($nextVersion) to npm"
           } '6' {
            $nextVersion = $prepatch
                Write-Host "Attempting to publishing new prepatch version $($nextVersion) to npm"
           } '7' {
            $nextVersion = $prerelase
                Write-Host "Attempting to publishing new prerelease version $($nextVersion) to npm"
           } 'q' {
                return
           }
     }
     pause
}
until ($input -eq 'q' -Or $input -eq '1' -Or $input -eq '2' -Or $input -eq '3' -Or $input -eq '4' -Or $input -eq '5' -Or $input -eq '6' -Or $input -eq '7' )


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
  npm run beforepublish
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
