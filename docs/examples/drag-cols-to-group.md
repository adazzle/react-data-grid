---
id: drag-cols-to-group
title: Grouping with draggable columns
---
<iframe src="https://codesandbox.io/embed/w741nqnxv7?autoresize=1&hidenavigation=1&view=preview" style="width:100%; height:750px; border:0; border-radius: 4px; " sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

----
You can see the code by clicking the blue rectangular Show Editor View button above, and also edit the example in the code editor directly.

Overview
-----

This example makes use of various components from `react-data-grid-addons` to enable column grouping by dragging a column

### 1. Set columns to be draggable
Any columns that you wish to make draggable, must have a `draggable: true` property.

### 2. Wrap ReactDataGrid instance in a DraggableContainer
This uses [React DnD](https://github.com/react-dnd/react-dnd) under the hood to make the grid draggable.

```javascript
import { Draggable } from "react-data-grid-addons";
const DraggableContainer = Draggable.Container;

  <DraggableContainer>
    <ReactDataGrid {...props}/>
  </DraggableContainer>    
```

### 3. Configure the toolbar 
The toolbar will act as a drag target. Columns can be dragged to the toolbar, and the toolbar will list all the columns that the grid is currently grouped by. Take a look at the source code to see how the toolbar can be configured


