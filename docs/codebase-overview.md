---
id: codebase-overview
title: Codebase Overview
---

## Project structure
The repository is designed in a way to easily add extra features without adding bloat to the main react-data-grid package. As such, we have decided to adopt a monorepository structure, allowing us to publish individual npm packages within the same repository. Each publishable package lives as a separate folder in the `packages` folder. 

Currently there are three packages:
- [**react-data-grid**](https://www.npmjs.com/package/react-data-grid) the core package of the grid, contains all the core functionality of the project
- [**react-data-grid-addons**](https://www.npmjs.com/package/react-data-grid-addons) a set of addons for the base grid, containing things like toolbars, custom editors...
- [**react-data-grid-examples**](https://www.npmjs.com/package/react-data-grid-examples) a playground for the project, this is where you can check your changes for real.

To manage the multiple packages in the project we use [lerna](https://lernajs.io/), It allows us to have an independent release process for each package,
individual and shared dependencies between packages and an automated bootstrap system to link packages together during development time.
This also means that you **must not add any path reference between packages**, when you need to use something in a different package you just need to import it as if
it was a standard npm package. (for example you if need something from react-data-grid package when developing in react-data-grid-addons you need to `import { something } from 'react-data-grid';`).

## Top-Level Folders
After cloning the ReactDataGrid repository, you will see a few top-level folders in it:

- [**ci**](https://github.com/adazzle/react-data-grid/tree/master/ci) - Contains scripts for continuous integration processes like building and publishing
- [**config**](https://github.com/adazzle/react-data-grid/tree/master/config) - Contains Webpack config files for building the project, and Karma config files for configuring testing.
- [**gulp**](https://github.com/adazzle/react-data-grid/tree/master/gulp) - There are some legacy build processes using Gulp that are still in use such as a gulp task to autogenerate documentation.
- [**packages**](https://github.com/adazzle/react-data-grid/tree/master/gulp) - Contains metadata (such as package.json) and the source code (src subdirectory) for all packages in the ReactDataGrid repository. If your change is related to the code, the src subdirectory of each package is where you’ll spend most of your time.
- [**themes**](https://github.com/adazzle/react-data-grid/tree/master/themes) - Contains styles that are imported to the various component using CSS loader.
- [**website**](https://github.com/adazzle/react-data-grid/tree/master/website) - Our public documentation site built with [Docusaurus](https://docusaurus.io)

## Colocated Tests
We don’t have a top-level directory for unit tests. Instead, we put them into a directory called __tests__ relative to the files that they test. 
For example, a test for [Cell.js](https://github.com/adazzle/react-data-grid/blob/master/packages/react-data-grid/src/Cell.js) is located in [\_\_tests_\_\/Cell.spec.js](https://github.com/adazzle/react-data-grid/blob/master/packages/react-data-grid/src/__tests__/Cell.spec.js) right next to it.
This is just a convention however and is not necessary to automatically detect a test. Test running is implemented using [Karma](https://karma-runner.github.io/latest/index.html) Any files with an extension of  ```.spec.js``` will be picked up by Karma when the test command `npm run test` is run.   
