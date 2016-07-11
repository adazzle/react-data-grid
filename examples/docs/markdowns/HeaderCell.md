`HeaderCell` (component)
========================



Props
-----

### `className`

type: `string`


### `column` (required)

type: `shapeunknown`


### `height` (required)

type: `number`


### `onResize` (required)

type: `func`


### `onResizeEnd` (required)

type: `func`


### `renderer` (required)

type: `union(func|element)`
defaultValue: `function simpleCellRenderer(objArgs: {column: {name: string}}): ReactElement {
  return <div className="widget-HeaderCell__value">{objArgs.column.name}</div>;
}`

