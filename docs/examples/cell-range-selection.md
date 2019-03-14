---
id: cell-range-selection
title: Cell Range Selection
sidebar_label: Cell Range Selection
---
<iframe src="https://codesandbox.io/embed/lyownmjyrm?autoresize=1&hidenavigation=1&view=preview" style="width:100%; height:650px; border:0; border-radius: 4px; " sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

----
You can see the code by clicking the blue rectangular Show Editor View button above, and also edit the example in the code editor directly.

Overview
-----
## Selection Range Events
### onStart
Called on mousedown on a cell. Receives selectedRange (containing topLeft and topRight) as an argument.

### onUpdate
Called on mouseover on a cell when dragging with the mouse, or when pressing shift+arrowkey. Receives selectedRange (containing topLeft and topRight) as an argument.

### onComplete
Called on mouseup (anywhere) when dragging with the mouse, or when pressing shift+arrowkey.

Note: altering the selected range with shift+arrowkey will fire both an Updated and Completed event with each keystroke.