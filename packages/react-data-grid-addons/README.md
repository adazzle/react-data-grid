# react-data-grid-addons

> A set of addons for react-data-grid with things like editors, formatters, toolbars, filters..
 

## Install

```sh
npm install --save react-data-grid-addons
```

## Usage 

```sh
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
