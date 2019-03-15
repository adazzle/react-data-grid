---
id: cell-actions
title: Cell Actions
---
<iframe src="https://codesandbox.io/embed/r57ox1p39q?autoresize=1&hidenavigation=1&view=preview" style="width:100%; height:700px; border:0; border-radius: 4px; " sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

----
You can see the code by clicking the blue rectangular Show Editor View button above, and also edit the example in the code editor directly.

Overview
-----
This example demonstrates how custom actions can be added to the cells of any column and row.
This feature was designed in such a way that one can decide which combination of row/columns should have actions on them.

### getCellActions prop
To use the cell action, create a function called getCellActions which will be passed as a prop to your react data grid instance
```javascript
/**
 * A function called for each rendered cell. Can be used to render custom cell icons each with corresponding action
 * @param Object column - The column of the rendered cell
 * @param Object row - The row of the rendered cell
 * @return Array 
 * */
function getCellActions(column, row) {
```
The function is called by react data grid for each cell with a column and row object, you can then create any condition you deem fit and return an array of objects to be rendered

`[{actionIcon, actionCallback}]` will render an action button

`[{actionIcon, actions: [{actionIcon, actionText, actionCallback}]}]` will render an action menu with the button opening a dropdown of actions