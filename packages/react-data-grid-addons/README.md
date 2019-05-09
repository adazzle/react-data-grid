# react-data-grid-addons [![npm-badge]][npm-url] [![bundlesize-badge]][bundlesize-url] [![coverage-badge]][azure-url]

[npm-badge]: https://img.shields.io/npm/v/react-data-grid-addons/next.svg
[npm-url]: https://www.npmjs.com/package/react-data-grid-addons
[bundlesize-badge]: https://img.shields.io/bundlephobia/minzip/react-data-grid-addons/next.svg
[bundlesize-url]: https://bundlephobia.com/result?p=react-data-grid-addons@next
[coverage-badge]: https://img.shields.io/azure-devops/coverage/nstepi181/react-data-grid/1/next.svg?style=flat-square
[azure-url]: https://dev.azure.com/nstepi181/react-data-grid/_build/latest?definitionId=1&branchName=next

A set of addons for react-data-grid with things like editors, formatters, toolbars, filters..

## Install

```sh
npm install react-data-grid-addons
```

## Usage

```jsx
import { Editors, Formatters } from 'react-data-grid-addons';
const { DropDownEditor } = Editors;
const { DropDownFormatter } = Formatters;

const titles = ['Dr.', 'Mr.', 'Mrs.', 'Miss', 'Ms.'];
const columns = [
  ...
  {
    key: 'titles',
    name: 'Titles',
    editor: <DropDownEditor options={titles} />,
    formatter: DropDownFormatter
  },
  ...
];

```

## Exports
This package exports:

name                   | source                                     |
-----------------------|--------------------------------------------|
Editors                | [Editors](./src/editors)                   |
Formatters             | [Formatters](./src/formatters)             |
Toolbar                | [Toolbar](./src/toolbars/Toolbar.js)       |
ToolsPanel             | [ToolsPanelCell](./src/toolbars)           |
Data                   | [Data](./src/data)                         |
Menu                   | [Menu](./src/menu)                         |
Draggable              | [Draggable](./src/draggable)               |
Filters                | [Filters](./src/cells/headerCells/filters) |
