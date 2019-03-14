---
id: render-base-row
title: Intercepting a row
---
<iframe src="https://codesandbox.io/embed/5zr5r03y44?autoresize=1&hidenavigation=1&view=preview" style="width:100%; height:750px; border:0; border-radius: 4px; " sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

----
You can see the code by clicking the blue rectangular Show Editor View button above, and also edit the example in the code editor directly.

Overview
-----
Sometimes it is necessary to intercept the default row renderer and customize it in some way. For example, you could change the editor of a column for individual rows, or you could change the style of the row. In the example above, the default row renderer is rendered as normal but we intercept the row to change the cell colour depending if it is an even or odd row.

### Row API
[Here is the API for the Row component](Row.md)
All of these props will be passed down from the Canvas component. However, they can be overridden from the custom row renderer. 
For example, we can override the row height of the row as in this example.

```javascript
const CustomRowRenderer = ({renderBaseRow, ...canvasProps}) => {
 // Here the height of the base row is overridden by a value of 100
 return renderBaseRow({...canvasProps, height: 100});
}
```

### renderBaseRow prop
A custom row renderer will be passed a prop called `renderBaseRow` which renders the default row renderer. In this way we can call that function in a custom row renderer and pass it down the components props.  

