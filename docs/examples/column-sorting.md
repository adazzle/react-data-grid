---
id: column-sorting
title: Column Sorting
---
<iframe src="https://codesandbox.io/embed/54pk3r46o4?autoresize=1&hidenavigation=1&view=preview" style="width:100%; height:600px; border:0; border-radius: 4px; " sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

----
In the above example, each column is configured to be sortable. When the header cell of a column is clicked, the sort order is toggled between ascending, descending and none. 
You can see the code by clicking the blue rectangular Show Editor View button above, and also edit the example in the code editor directly.

Guide
-----
### Configuring the column
To make a given column sortable, set ```column.sortable = true```

### onGridSort handler
The grid provides an ```onGridSort``` prop which is called whenever the header cell of the column is clicked. You can handle this callback in your component to modify the sort order of the grid rows.

### sortDescendingFirst prop
To enable a column to be sorted in descending order first set ```column.sortDescendingFirst = true``` prop.