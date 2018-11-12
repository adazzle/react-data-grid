---
id: quick-start
title: Quick Start
---

React Data Grid is an excel like data grid component powered by React.

## Installing react-data-grid

```bash
$ npm install react-data-grid --save
# or with yarn:
$ yarn add react-data-grid
```

## Importing Data Grid Component
Below is the minimum configuration required to import ReactDataGrid into your application.
```typescript
import React from 'react';
import ReactDataGrid from 'react-data-grid';

const columns = [
  { key: 'id', name: 'ID' },
  { key: 'title', name: 'Title' },
  { key: 'count', name: 'Count' } ];

const rows = [{id: 0, title: 'row1', count: 20}, {id: 1, title: 'row1', count: 40}, {id: 2, title: 'row1', count: 60}];

function HelloWorld() {
  return (<ReactDataGrid
  columns={columns}
  rowGetter={i => rows[i]}
  rowsCount={3}
  minHeight={150} />);
}
```
