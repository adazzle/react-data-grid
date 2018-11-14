---
id: architecture
title: Component Archticture
---

Here is the basic top down component heirarchy of the grid

```bash
ReactDataGrid 'Root API Component to render a data grid'
└─┬  BaseGrid 'Renders the Header and Viewport'
  ├─┬ Header 'Renders HeaderRow and Cells based on a list of columns'
  │ └─┬ HeaderRow
  │   └── HeaderCell
  └─┬ Viewport 'Calculates the visible rows and columns to show as well as a buffer of overflow rows and columns'
    └─┬ Canvas 'Renders the visible rows and columns'
      └── InteractionMasks 'A layer that sits above the grid which is used for interaction such as keyboard navigation'
      │   └── SelectionMask 'A component used to track the selected cell. It can be moved by using the keyboard or the mouse'
      │   └── EditorContainer 'When a cell is being edited, this component renders the editor specified in column.editor'
      │     └── Editor 'Component used to update the data of a cell'
      └── Row 'Component that renders a list of Cell components for each column'
        └── Cell 'Renders the cell content'
          └── Formatter 'The component to display the cell content as specified by column.formatter'
```