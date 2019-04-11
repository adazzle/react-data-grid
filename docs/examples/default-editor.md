---
id: default-editor
title: Basic cell editing
sidebar_label: Basic cell editing
---
<iframe src="https://codesandbox.io/embed/5vy2q8owj4?autoresize=1&hidenavigation=1&view=preview" style="width:100%; height:600px; border:0; border-radius: 4px; " sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

----
You can see the code by clicking the blue rectangular Show Editor View button above, and also edit the example in the code editor directly.

Overview 
-----
Above is an example where editing is enabled on the Title column. Try to edit both individual cells using the keyboard, as well as multiple cells using the mouse to drag or double click the cells drag handle.  

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