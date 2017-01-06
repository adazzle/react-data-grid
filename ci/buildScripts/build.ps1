function Clean-Dist () {
  New-Item -Path ".\packages\react-data-grid\dist\react-data-grid.js" -type file -force 
  New-Item -Path ".\packages\react-data-grid-addons\dist\react-data-grid-addons.js" -type file -force 
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

exit $lastexitcode
