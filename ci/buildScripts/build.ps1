function Clean-Dist () {
  $allPackageDists = Get-ChildItem -Path .\packages\*\dist -Include *.js -Recurse 

  ForEach ($file in $allPackageDists) {
    New-Item $file.FullName -type file -force
  }
}

function Build () {
  npm run build
}

Write-Host "-- Cleaning files in dist folders --"
Clean-Dist
Write-Host "-- File cleanup finished --"
Write-Host "-- Build process --"
Build
Write-Host "-- Build completed --"