# React Data Grid [![npm-badge]][npm-url] [![azure-badge]][azure-url] [![coverage-badge]][azure-url]

[npm-badge]: https://img.shields.io/npm/v/react-data-grid/alpha.svg
[npm-url]: https://www.npmjs.com/package/react-data-grid
[azure-badge]: https://img.shields.io/azure-devops/build/nstepi181/e5b746e6-be62-4d36-896f-1e636f889cdc/1/alpha.svg?logo=pipelines&style=flat-square
[coverage-badge]: https://img.shields.io/azure-devops/coverage/nstepi181/react-data-grid/1/alpha.svg?style=flat-square
[azure-url]: https://dev.azure.com/nstepi181/react-data-grid/_build/latest?definitionId=1&branchName=alpha

Excel-like grid component built with React, with editors, keyboard navigation, copy &amp; paste, and the like


http://adazzle.github.io/react-data-grid/
![react-data-grid](https://cloud.githubusercontent.com/assets/1432798/7348812/78063bd6-ecec-11e4-89d5-ffd327721cd7.PNG)


Overview
--------
ReactDataGrid is an advanced JavaScript spreadsheet-like grid component built using React

Installation
------------
The easiest way to use react-data-grid is to install it from npm and build it into your app with Webpack.
```sh
npm install react-data-grid
```

You can then import react-data-grid in your application as follows:
```js
import DataGrid from 'react-data-grid';
```

Versions In This Repository
--------

- [master](https://github.com/adazzle/react-data-grid/commits/master) - commits that will be included in the next _minor_ or _patch_ release
- [alpha](https://github.com/adazzle/react-data-grid/commits/alpha) - commits that will be included in the next _major_ release (breaking changes)

Most PRs should be made to **master**, unless you know it is a breaking change.

To install the latest **unstable** version, you can run
```sh
npm install react-data-grid@alpha
```

Migrations
--------
If you intend to do a major release update for you react-data-grid check [the migration documents](migrations).

Features
--------

- Lightning fast virtual rendering
- [Can render hundreds of thousands of rows with no lag](http://adazzle.github.io/react-data-grid/#/examples/one-million-rows)
- Keyboard navigation
- [Fully editable grid](http://adazzle.github.io/react-data-grid/#/examples/editable)
- [Rich cell editors like checkbox and dropdown editors, complete with keyboard navigation](http://adazzle.github.io/react-data-grid/#/examples/built-in-editors)
- Custom cell Editors - Easily create your own
- [Custom cell Formatters](http://adazzle.github.io/react-data-grid/#/examples/custom-formatters)
- [Frozen columns](http://adazzle.github.io/react-data-grid/#/examples/frozen-cols)
- [Resizable columns](http://adazzle.github.io/react-data-grid/#/examples/resizable-cols)
- [Sorting](http://adazzle.github.io/react-data-grid/#/examples/sortable-cols)
- [Filtering](http://adazzle.github.io/react-data-grid/#/examples/filterable-sortable-grid)
- [Context Menu](http://adazzle.github.io/react-data-grid/#/examples/context-menu)
- Copy and Paste values into other cells
- [Multiple cell updates using cell dragdown](http://adazzle.github.io/react-data-grid/#/examples/cell-drag-down)
- [Association of events of individual columns](http://adazzle.github.io/react-data-grid/#/examples/column-events)


Contributing
------------

Please see [CONTRIBUTING](docs/CONTRIBUTING.md)

Credits
------------
This project has been built upon the great work done by [Prometheus Research](https://github.com/prometheusresearch). For the original project, please click [here]( https://github.com/prometheusresearch/react-grid). It is released under [MIT](https://github.com/adazzle/react-data-grid/blob/master/LICENSE)
