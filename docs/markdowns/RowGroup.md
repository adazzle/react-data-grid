`RowGroup` (component)
======================



Props
-----

### `cellMetaData`

type: `object`


### `columnGroupName` (required)

type: `string`


### `height` (required)

type: `number`


### `idx` (required)

type: `number`


### `isExpanded` (required)

type: `bool`


### `name` (required)

type: `string`


### `renderer`

type: `func`
defaultValue: `(props) => {
  let treeDepth = props.treeDepth || 0;
  let marginLeft = treeDepth * 20;

  return (
    <div>
      <span className="row-expand-icon" style={{float: 'left', marginLeft: marginLeft, cursor: 'pointer'}} onClick={props.onRowExpandClick} >{props.isExpanded ? String.fromCharCode('9660') : String.fromCharCode('9658')}</span>
      <strong>{props.columnGroupName} : {props.name}</strong>
    </div>);
}`


### `treeDepth` (required)

type: `number`

