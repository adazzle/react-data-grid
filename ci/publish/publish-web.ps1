$input = Read-Host "Enter your authorised github username"
Set-Item -Path Env:GIT_USER -Value ($input)
Set-Item -Path Env:USE_SSH -Value ('true')
USE_SSH
Set-Location .\website
npm run publish-gh-pages