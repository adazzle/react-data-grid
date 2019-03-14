---
id: row-renderer
title: Custom Row Renderers
---
<iframe src="https://codesandbox.io/embed/o9qo7zwjxq?autoresize=1&hidenavigation=1&view=preview" style="width:100%; height:750px; border:0; border-radius: 4px; " sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

----
You can see the code by clicking the blue rectangular Show Editor View button above, and also edit the example in the code editor directly.

Overview
-----
ReactDataGrid is designed to be flexible, and allow you to render your data however you want. This example demonstrates how to use a custom row renderer to display a card view of each contact instead of the standard row with cells.

### rowRenderer prop
In order to set a custom row renderer, set the `rowRenderer` prop to be any React component, instance or function. 

