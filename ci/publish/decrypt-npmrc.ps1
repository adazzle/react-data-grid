Write-Host "Decrypting .npmrc.enc file with secure-file"
nuget install secure-file -ExcludeVersion
secure-file\tools\secure-file -decrypt .npmrc.enc -secret vqGk4eUIvg1ngzdW4WE2hlq1U7YupunkayeCh7bXy8M=
