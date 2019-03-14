---
id: simple-grid
title: Simple Grid
sidebar_label: Simple Grid
---
<iframe src="https://codesandbox.io/embed/5vy2q8owj4?autoresize=1&hidenavigation=1&view=preview" style="width:100%; height:450px; border:0; border-radius: 4px; " sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

----
You can see the code by clicking the blue rectangular Show Editor View button above, and also edit the example in the code editor directly.

Guide
-----
For the minimum setup, ReactDataGrid requires the following props

Name | Type | Description 
--------- | ---- | ----------- 
`columns`| Array | An array of object that have a `key` and `name` property
`rowsCount`| Number | The number of rows to be rendered
`rowGetter`| Function|  A function called for each rendered row that should return a plain key/value pair object

The value of each rendered cell will be determined by the value of each row's property whose name matches the `key` name of a `column`.

Below is a grid which renders three rows and three columns. You can see 
the code by clicking the blue rectangular Show Editor View button, and even edit the example in the code editor directly. 
