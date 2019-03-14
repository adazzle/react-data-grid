---
id: context-menu
title: Context Menu
sidebar_label: Context Menu
---
<iframe src="https://codesandbox.io/embed/m32656jxn9?autoresize=1&hidenavigation=1&view=preview" style="width:100%; height:650px; border:0; border-radius: 4px; " sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

----
You can see the code by clicking the blue rectangular Show Editor View button above, and also edit the example in the code editor directly.

Overview
-----
To use a context menu on the grid, import the ContextMenu from react-data-grid-addons and then set the contextMenu prop of the grid to this context menu.
If you need to know the row and column index where the context menu is shown, use the context menu's rowIdx and idx props.
Credits: the context menu we use is react-contextmenu by Vivek Kumar Bansal.