### Release process

For maintainers only.

- `cd` to the root of the repo.
- Checkout the branch you wish to publish. `master`, `alpha`, or `canary`
- Make sure your local branch is up to date, no unpushed or missing commits, stash any changes.
- Update the changelog, if necessary, and commit.
- Login to the `adazzle` npm account if you haven't already done so:
  - `npm login`
  - You can use `npm whoami` to check who you are logged in as.
- Bump the version and publish on npm:
  - To release a new stable version:
    - `npm version [major | minor | patch] -m "Publish %s"`
    - `npm publish`
  - To release a new `alpha` version:
    - `npm version prerelease --preid=alpha -m "Publish %s"`
    - `npm publish --tag alpha`
  - To release a new `canary` version:
    - `npm version prerelease --preid=canary -m "Publish %s"`
    - `npm publish --tag canary`
  - Relevant docs:
    - https://docs.npmjs.com/cli/version
    - https://docs.npmjs.com/cli/publish
    - https://docs.npmjs.com/misc/scripts
    - https://git-scm.com/docs/git-push
