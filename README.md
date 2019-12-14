# react-data-grid [![npm-badge]][npm-url] [![bundlesize-badge]][bundlesize-url] [![coverage-badge]][azure-url]

[npm-badge]: https://img.shields.io/npm/v/react-data-grid/next?style=flat-square
[npm-url]: https://www.npmjs.com/package/react-data-grid
[bundlesize-badge]: https://img.shields.io/bundlephobia/minzip/react-data-grid/next?style=flat-square
[bundlesize-url]: https://bundlephobia.com/result?p=react-data-grid@next
[coverage-badge]: https://img.shields.io/azure-devops/coverage/nstepi181/react-data-grid/1/next?style=flat-square
[azure-url]: https://dev.azure.com/nstepi181/react-data-grid/_build/latest?definitionId=1&branchName=next

<!--
Excel-like grid component built with React, with editors, keyboard navigation, copy & paste, and the like

http://adazzle.github.io/react-data-grid/
![react-data-grid](https://cloud.githubusercontent.com/assets/1432798/7348812/78063bd6-ecec-11e4-89d5-ffd327721cd7.PNG)
-->

## Install

```sh
npm install react-data-grid
```

## Usage

```jsx
import DataGrid from 'react-data-grid';
import 'react-data-grid/dist/react-data-grid.css';

const columns = [
  { key: 'id', name: 'ID' },
  { key: 'title', name: 'Title' }
];

const rows = [
  { id: 0, title: 'Example' },
  { id: 1, title: 'Demo' }
];

const rowGetter = rowIndex => rows[rowIndex];

function App() {
  return (
    <DataGrid
      columns={columns}
      rowGetter={rowGetter}
      rowsCount={rows.length}
      minHeight={500}
    />
  );
}
```

<!--
## Features

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
-->

## Contributing

Please see [CONTRIBUTING](docs/CONTRIBUTING.md)

<!--
## Credits

This project has been built upon the great work done by [Prometheus Research](https://github.com/prometheusresearch). For the original project, please click [here]( https://github.com/prometheusresearch/react-grid). It is released under [MIT](https://github.com/adazzle/react-data-grid/blob/master/LICENSE)
-->
