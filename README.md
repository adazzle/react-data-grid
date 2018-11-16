# React Data Grid 

[logo]: https://user-images.githubusercontent.com/1432798/48616964-077b9400-e98d-11e8-9b56-f70e0722b83d.png "ReactDataGrid"

[![Build status](https://ci.appveyor.com/api/projects/status/smciktvlkvp6r8w7/branch/master?svg=true)](https://ci.appveyor.com/project/adazzle/react-data-grid/branch/master)
[![Coverage Status](https://coveralls.io/repos/adazzle/react-data-grid/badge.svg?branch=master)](https://coveralls.io/r/adazzle/react-data-grid?branch=master)
[![npm version](https://badge.fury.io/js/react-data-grid.svg)](http://badge.fury.io/js/react-data-grid) 
![npm dependencies](https://david-dm.org/adazzle/react-data-grid.svg)
[![CDNJS](https://img.shields.io/cdnjs/v/react-data-grid.svg)](https://cdnjs.com/libraries/react-data-grid)

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
```typescript
import ReactDataGrid from 'react-data-grid';
```

Versions In This Repository
--------

- [master](https://github.com/adazzle/react-data-grid/commits/master) - commits that will be included in the next _minor_ or _patch_ release
- [next](https://github.com/adazzle/react-data-grid/commits/next) - commits that will be included in the next _major_ release (breaking changes)

Most PRs should be made to **master**, unless you know it is a breaking change.

To install the latest **unstable** version, you can run 
```sh
npm install react-data-grid@next
```

Themes
------
We use [Bootstrap](https://github.com/twbs/bootstrap). If you want your Grid to get the "default" styling like the picture above, you'll need to include it separately.

```
npm install bootstrap
```
and then import the css from the dist folder when bootstrapping your application
```
import 'bootstrap/dist/css/bootstrap.css';
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
- [Rich cell editors like autocomplete, checkbox and dropdown editors, complete with keyboard navigation](http://adazzle.github.io/react-data-grid/#/examples/built-in-editors)
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


Check out the `examples` directory to see how simple previously complex UI
and workflows are to create.


Contributing
------------

Please see [CONTRIBUTING](CONTRIBUTING.md)

Credits 
------------
This project has been built upon the great work done by [Prometheus Research](https://github.com/prometheusresearch). For the original project, please click [here]( https://github.com/prometheusresearch/react-grid). It is released under [MIT](https://github.com/adazzle/react-data-grid/blob/master/LICENSE)
