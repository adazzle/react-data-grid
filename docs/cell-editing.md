---
id: cell-editing
title: Cell Editing
---

By default, each cell of ReactDataGrid is readonly. It can be turned on for a given column as described in this article.

## Cell Update scenarios
When editing is enabled, it is possible to update the values of a cell in the following ways
 * Using the supplied editor of the column. The default editor is the [SimpleTextEditor](https://github.com/adazzle/react-data-grid/blob/master/packages/common/editors/SimpleTextEditor.js).
 * Copy/pasting the value from one cell to another <kbd>CTRL</kbd>+<kbd>C</kbd>, <kbd>CTRL</kbd>+<kbd>V</kbd>
 * Update multiple cells by dragging the fill handle of a cell up or down to a destination cell.
 * Update all cells under a given cell by double clicking the cell's fill handle.

## Enabling cell edit
In order for the cells of a column to be editable, you need to do the following:

1. Set the `editable` property of the column to be true.
2. Provide an `onGridRowsUpdated` handler function. The below snippet is an example handler that handles all the above update scenarios. 

```javascript
  onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
    this.setState(state => {
      const rows = state.rows.slice();
      for (let i = fromRow; i <= toRow; i++) {
        rows[i] = { ...rows[i], ...updated };
      }
      return { rows };
    });
  };
```

## Cell Edit Example
Below is an example where editing is enabled on the Title column. Try to edit both individual cells using the keyboard, as well as multiple cells using the mouse to drag or double click the cells drag handle. You can see the code by clicking the blue rectangular Show Editor View button, and even edit the example in the code editor directly. 
<iframe src="https://codesandbox.io/embed/5vy2q8owj4?autoresize=1&hidenavigation=1&view=preview" style="width:100%; height:600px; border:0; border-radius: 4px; " sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

## Built In Editors
Apart from the [SimpleTextEditor](https://github.com/adazzle/react-data-grid/blob/master/packages/common/editors/SimpleTextEditor.js), ReactDatGrid also comes with a set of built in editors from the `react-data-grid-addons` package. These can provide a better experience when editing certain fields like list and boolean values. 

### DropDown Editor
In this example, the `DropDownEditor` is imported from the `react-data-grid-addons` package and configured to to be the editor for the IssueType column. The editor takes a sigle `options` prop which is an array of values of type `{id, value}`. 
<iframe src="https://codesandbox.io/embed/vq5387plyy?autoresize=1&hidenavigation=1&view=preview" style="width:100%; height:500px; border:0; border-radius: 4px; " sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

### Autocomplete Editor
In this example, the `AutoComplete` editor is imported from the `react-data-grid-addons` package and configured to to be the editor for the IssueType column. The editor takes a sigle `options` prop which is an array of values of type `{id, title}`. 
<iframe src="https://codesandbox.io/embed/5z3lk4jvm4?autoresize=1&hidenavigation=1&view=preview" style="width:100%; height:500px; border:0; border-radius: 4px; " sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

## Custom Editors

### Creating a custom editor
ReactDataGrid can be customised with custom cell editors to provide a richer editing experience depending on what sort of data is being edited. For example, if a column is displaying a range of values between 0 and 100 you could provide it with a slider editor to provide a better experience for choosing the right number. 

Or you could create an editor that takes in the composite values of two or more columns, allowing them to be updated from the same editor. Think for example if you had separate columns representing date and time. It could be possible for both columns to open a calendar editor that easily allows you to set both the date and time from one control. 

The pluggable nature of ReactDataGrid can work really well with third party components. All that is needed is to provide the interface between the Grid and the external component. Below, we will show how to leverage a third party React component called [React Color](https://casesandberg.github.io/react-color/) to create a ColorPickerEditor that allows to select a hexidecimal color value from and set the data of that cell. 

### Editor API
A ReactDataGrid editor is a React component that needs to implement three methods, `getValue`, `getInputNode`  
and `render`. Here is a skeleton of a CustomEditor.

```javascript
class CustomEditor extends React.Component {

  getValue() {
    // should return an object of key/value pairs to be merged back to the row
  }

  getInputNode() {
    // If applicable, should return back the primary html input node that is used to edit the data
    // Otherwise return null
    // If value is an input node, then this node will be focussed on when the editor opens
  }

  render() {
    // return UI for the editor
  }
}

```

### Editor Props
The CustomEditor takes the following props

Name | Type | Description 
--------- | ---- | ----------- 
`column`| Object | The column of the cell to be edited
`value`| Any | The value of the cell
`onCommit`| Function|  Can be called manually to trigger committing of the editor if necessary. 
`onCommitCancel`| Function|  Can be called manually to cancel the editor without committing 
`rowData` | Object| key/value pairs representing the row being edited


### Editor Lifecycle
* User activates a cell by double clicking or pressing enter on the keyboard.
* ReactDataGRid will check if a column has an `Editor` property set.
* If editor is present, then the editor will be mounted and passed the value of the cell, as well as the above props.
* The editor maintains its own separate state, and does not update the grid until the editor is committed. An editor is committed when either 
 * the user tabs out of the primary input node 
 - the user clicks enter on the primary input node
 - focus switches back to the data grid
 - onCommit is called manually
* If the user presses `escape`, then onCommitCancel is called, the editor is closed and the grid retains its original data before the editor was opened.

### Custom Editor example
Below is an example showing how to set the colour of the Label Colour column by the user of a custom ColourPicker editor.
<iframe src="https://codesandbox.io/embed/l9ko3oqwym?autoresize=1&hidenavigation=1&view=preview" style="width:100%; height:500px; border:0; border-radius: 4px; " sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
