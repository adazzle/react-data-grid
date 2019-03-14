---
id: column-filtering
title: Basic Filtering
---
<iframe src="https://codesandbox.io/embed/w6jvml4v45?autoresize=1&hidenavigation=1&view=preview" style="width:100%; height:700px; border:0; border-radius: 4px; " sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

----
In the above example, each column is configured to be filterable. The grid is also supplier with a toolbar component that provides a button to show filters for each column. 
When text is input into each filter input, the rows are filtered accordingly.
You can see the code by clicking the blue rectangular Show Editor View button above, and also edit the example in the code editor directly.

Guide
-----
### Configuring the column
To make a given column filterable, set ```column.filterable = true```

### onAddFilter handler
The grid provides an ```onAddFilter``` prop which is called whenever text is input into a columns filter input. You can handle this callback in your component to modify the grid rows.

### Using RDG Data.Selectors to filter rows
The source code for the above example makes use of the ```Data.Selectors.getRows``` selector from the `react-data-grid-addons` package. Selectors are simply functions that are used to select a subset data from a larger data collection. The selector allows for greater efficiency when rendering the data. Rather than recompute what the filtered rows are for each grid render, the selector only recalculates the rows when the inputs change. In this example, a `filters` object is passed to the selector which stores the columns to be filtered and what the filter term for each column is. Since operations like filtering and sorting are so common to data grid entry, this functionality has been extracted to its own module.

### onClearFilters handler
The grid provides an ```onClearFilters``` prop which is called whenever the UI for the column filtering is closed via the toolbar.