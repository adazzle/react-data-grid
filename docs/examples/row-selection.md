---
id: row-selection
title: Row Selection
sidebar_label: Row Selection
---
<iframe src="https://codesandbox.io/embed/v0zj8qmw6y?autoresize=1&hidenavigation=1&view=preview" style="width:100%; height:650px; border:0; border-radius: 4px; " sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

----
You can see the code by clicking the blue rectangular Show Editor View button above, and also edit the example in the code editor directly.

Overview
-----

Row selection is enabled via the `rowSelection` prop (object).

### rowSelection prpos
  | Name | Type | Required | Description
  | --------- | ---- | ---- | ----------------------------------
  |enableShiftSelect | bool | false | When toggled, can use the shift key to select rows| 
onRowsSelected | func | false | Function called whenever rows are selected| 
onRowsDeselected | func | false | Function called whenever rows are deselected| 
showCheckbox | bool | false | toggle whether to show a checkbox in first column to select rows| 
selectBy | union | true | Method by which rows should be selected| 
 