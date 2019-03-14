---
id: column-resizing
title: Column Resizing
---
<iframe src="https://codesandbox.io/embed/x393m83l3o?autoresize=1&hidenavigation=1&view=preview" style="width:100%; height:600px; border:0; border-radius: 4px; " sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

----
In the above example, each column is configured to be resizable, and can be resized by dragging the columns border with the mouse.
You can see the code by clicking the blue rectangular Show Editor View button above, and also edit the example in the code editor directly.

Guide
-----
To make a given column resizable, set ```column.resizable = true```
If you need to know when a column has been resized, use the ```onColumnResize``` prop. This will be triggered when a column is
resized and will report the column index and its new width. These can be saved on the back-end and used to restore column widths when
the component is initialized, by setting ```width``` key in each column.