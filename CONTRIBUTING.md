### Release process

For maintainers only.

- `cd` to the root of the repo.
- Checkout the `main` branch.
- Make sure your local branch is up to date, no unpushed or missing commits, stash any changes.
- Update the changelog, if necessary, and commit.
- Login to the `adazzle` npm account if you haven't already done so:
  - `npm login`
  - You can use `npm whoami` to check who you are logged in as.
- Bump the version and publish on npm:
  <!-- - To release a new stable version:
    - `npm version [major | minor | patch] -m "Publish %s"`
    - `npm publish` -->
  - To release a new `beta` version:
    - `npm version prerelease --preid=beta -m "Publish %s"`
    - `npm publish --tag beta`
  - Relevant docs:
    - https://docs.npmjs.com/cli/v7/commands/npm-version
    - https://docs.npmjs.com/cli/v7/commands/npm-publish
    - https://docs.npmjs.com/cli/v7/using-npm/scripts
    - https://git-scm.com/docs/git-push
