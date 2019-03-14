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

There is also a [common](https://github.com/adazzle/react-data-grid/tree/master/packages/common) folder which contains common code between all packages.

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

## Packages
### react-data-grid
This is main npm package that contains the ReactDataGrid component.
Here is the basic top down component heirarchy of the grid

```bash
ReactDataGrid 'Root API Component to render a data grid'
└─┬  BaseGrid 'Renders the Header and Viewport'
  ├─┬ Header 'Renders HeaderRow and Cells based on a list of columns'
  │ └─┬ HeaderRow
  │   └── HeaderCell
  └─┬ Viewport 'Calculates the visible rows and columns to show as well as a buffer of overflow rows and columns'
    └─┬ Canvas 'Renders the visible rows and columns'
      └── InteractionMasks 'A layer that sits above the grid which is used for interaction such as keyboard navigation'
      │   └── SelectionMask 'A component used to track the selected cell. It can be moved by using the keyboard or the mouse'
      │   └── EditorContainer 'When a cell is being edited, this component renders the editor specified in column.editor'
      │     └── Editor 'Component used to update the data of a cell'
      └── Row 'Component that renders a list of Cell components for each column'
        └── Cell 'Renders the cell content'
          └── Formatter 'The component to display the cell content as specified by column.formatter'
```

### react-data-grid-addons
Below are the current addons available in the addons package. It is a future goal of the project to deprecate this package and move each folder to its own separate package
 - [Editors](https://github.com/adazzle/react-data-grid/tree/master/packages/react-data-grid-addons/src/editors) - Contains a range of cell editors for the grid
 - [Formatters](https://github.com/adazzle/react-data-grid/tree/master/packages/react-data-grid-addons/src/formatters) - Contains a selection of formatters for the grid
 - [Toolbar](https://github.com/adazzle/react-data-grid/tree/master/packages/react-data-grid-addons/src/toolbar)
 - [Menu](https://github.com/adazzle/react-data-grid/tree/master/packages/react-data-grid-addons/src/menu) - A context menu that can be used on the grid
 - [Data](https://github.com/adazzle/react-data-grid/tree/master/packages/react-data-grid-addons/src/data) - Functional utilities for row filtering, grouping, sorting, expanding etc that can be used to modify grid rows based on certain input paramaters
 - [ToolsPanel](https://github.com/adazzle/react-data-grid/tree/master/packages/react-data-grid-addons/src/toolspanel) - UI components used for a tool panel above the grid.
 - [Draggable](https://github.com/adazzle/react-data-grid/tree/master/packages/react-data-grid-addons/src/draggable) - Utilities to add drag and drop capability to the grid
 - [Filters](https://github.com/adazzle/react-data-grid/tree/master/packages/react-data-grid-addons/src/filters) - Custom Filters that can be added to the header of the grid 
