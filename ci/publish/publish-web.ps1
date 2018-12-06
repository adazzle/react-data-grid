$input = Read-Host "Enter your authorised github username"
Set-Item -Path Env:GIT_USER -Value ($input)
Set-Location .\website
npm run publish-gh-pages
