function Clear-Dist () {
  $distFolders= dir packages/*/dist | ?{$_.PSISContainer}

  foreach ($folder in $distFolders){
    $path = Join-Path -Path $folder.FullName -ChildPath "*"
    Remove-Item $path -recurse
    Write-Host "Cleaned dist folder in $($path)"
  }
}

function Build () {
  npm run build
}

Write-Host "-- Cleaning files in dist folders --"
Clear-Dist
Write-Host "-- File cleanup finished --"
Write-Host "-- Build process --"
Build
Write-Host "-- Build completed --"

exit $lastexitcode
