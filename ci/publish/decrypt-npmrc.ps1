Write-Host "Decrypting .npmrc.enc file with secure-file"
nuget install secure-file -ExcludeVersion
secure-file\tools\secure-file -decrypt .npmrc.enc -secret $($env:npmrc_token)
