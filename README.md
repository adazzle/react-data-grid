# react-data-grid [![npm-badge]][npm-url] [![bundlesize-badge]][bundlesize-url] [![coverage-badge]][azure-url]

[npm-badge]: https://img.shields.io/npm/v/react-data-grid/alpha?style=flat-square
[npm-url]: https://www.npmjs.com/package/react-data-grid
[bundlesize-badge]: https://img.shields.io/bundlephobia/minzip/react-data-grid/alpha?style=flat-square
[bundlesize-url]: https://bundlephobia.com/result?p=react-data-grid@alpha
[coverage-badge]: https://img.shields.io/azure-devops/coverage/nstepi181/react-data-grid/1/alpha?style=flat-square
[azure-url]: https://dev.azure.com/nstepi181/react-data-grid/_build/latest?definitionId=1&branchName=alpha

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

function App() {
  return (
    <DataGrid
      columns={columns}
      rows={rows}
    />
  );
}
```

## Documentation

- [Website](https://adazzle.github.io/react-data-grid/)
- [Changelog](CHANGELOG.md)
- [Contributing](CONTRIBUTING.md)
