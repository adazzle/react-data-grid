$dir = dir packages | ?{$_.PSISContainer}

foreach ($d in $dir){
    $path = Join-Path -Path $d.FullName -ChildPath ""
    $name = $d.Name
    $root = Get-Location
    $fileToCopyPath = "$($root)\.npmrc"

    Write-Host "Copy .npmrc to package $($name) from $($fileToCopyPath) to $($path)"

    Copy-Item $fileToCopyPath $path
}
