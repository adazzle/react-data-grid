---
id: cell-formatting
title: Cell Formatting
---
<iframe src="https://codesandbox.io/embed/18280n8r5q?autoresize=1&hidenavigation=1&view=preview" style="width:100%; height:600px; border:0; border-radius: 4px; " sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
----
Above is an example of displaying a progress bar to show the % complete for each task. 
You can see the code by clicking the blue rectangular Show Editor View button above, and also edit the example in the code editor directly.

Guide
-----
By default, ReactDataGrid will render the content of a cell using the [SimpleCellFormatter](https://github.com/adazzle/react-data-grid/blob/master/packages/react-data-grid/src/formatters/SimpleCellFormatter.js). It is possible to render custom content for a column by setting its `Formatter` property and providing it a React component. 

## Formatter
A Formatter can be any React component. It will take in the following props. 

### Required Props
Name | Type | Description | Default
--------- | ---- | ----------- | ----------
`value`| Any | The value of the property of a row whose name matches the `key` property of a given column. | n/a

### Optional Props
Name | Type | Description | Default
--------- | ---- | ----------- | ----------
`isScrolling`| Boolean | Can be used to render alternative content in when the grid is scrolling in order to make scrolling more smooth | false
`row`| Function|  The entire row object. Can be used for more complex use cases that depend on data from other columns. | n/a
