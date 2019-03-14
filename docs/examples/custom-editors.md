---
id: custom-editors
title: Custom Editors
---
<iframe src="https://codesandbox.io/embed/l9ko3oqwym?autoresize=1&hidenavigation=1&view=preview" style="width:100%; height:500px; border:0; border-radius: 4px; " sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

----
You can see the code by clicking the blue rectangular Show Editor View button above, and also edit the example in the code editor directly.

Guide
-----
### Creating a custom editor
ReactDataGrid can be customised with custom cell editors to provide a richer editing experience depending on what sort of data is being edited. For example, if a column is displaying a range of values between 0 and 100 you could provide it with a slider editor to provide a better experience for choosing the right number. 

Or you could create an editor that takes in the composite values of two or more columns, allowing them to be updated from the same editor. Think for example if you had separate columns representing date and time. It could be possible for both columns to open a calendar editor that easily allows you to set both the date and time from one control. 

The pluggable nature of ReactDataGrid can work really well with third party components. All that is needed is to provide the interface between the Grid and the external component. Below, we will show how to leverage a third party React component called [React Color](https://casesandberg.github.io/react-color/) to create a ColorPickerEditor that allows to select a hexidecimal color value from and set the data of that cell. 

### Editor API
A ReactDataGrid editor is a React component that needs to implement three methods, `getValue`, `getInputNode`  
and `render`. There is a fourth optional method called `disableContainerStyles`. Here is a skeleton of a CustomEditor.

```javascript
class CustomEditor extends React.Component {

  getValue() {
    // should return an object of key/value pairs to be merged back to the row
  }

  getInputNode() {
    // If applicable, should return back the primary html input node that is used to edit the data
    // Otherwise return null
    // If value is an input node, then this node will be focussed on when the editor opens
  }

  disableContainerStyles() {
    // Optional method
    // If set to true, the EditorContainer will not apply default styling to the editor
  }

  render() {
    // return UI for the editor
  }
}

```

### Editor Props
The CustomEditor takes the following props

Name | Type | Description 
--------- | ---- | ----------- 
`column`| Object | The column of the cell to be edited
`value`| Any | The value of the cell
`onCommit`| Function|  Can be called manually to trigger committing of the editor if necessary. 
`onCommitCancel`| Function|  Can be called manually to cancel the editor without committing 
`rowData` | Object| key/value pairs representing the row being edited


### Editor Lifecycle
* User activates a cell by double clicking or pressing enter on the keyboard.
* ReactDataGRid will check if a column has an `Editor` property set.
* If editor is present, then the editor will be mounted and passed the value of the cell, as well as the above props.
* The editor maintains its own separate state, and does not update the grid until the editor is committed. An editor is committed when either 
 * the user tabs out of the primary input node 
 - the user clicks enter on the primary input node
 - focus switches back to the data grid
 - onCommit is called manually
* If the user presses `escape`, then onCommitCancel is called, the editor is closed and the grid retains its original data before the editor was opened.
