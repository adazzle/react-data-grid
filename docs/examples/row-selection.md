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

#### selectBy options

There are 3 ways to keep track of selected rows. 

|Name | Type | Description|
|----|---|---|
|indexes|array|List of indexes of selected rows (doesn't work well with sorting and filtering)|
|isSelectedKey|string|Name of property of row object which determines whether row is selected|
|keys|object|values: The selected unique ids of each row <br />rowKey: The name of the unique id property of each row|
 
