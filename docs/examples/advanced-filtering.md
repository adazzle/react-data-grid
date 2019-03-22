---
id: advanced-filtering
title: Advanced Filtering
---
<iframe src="https://codesandbox.io/embed/qqlxyk43j9?autoresize=1&hidenavigation=1&view=preview" style="width:100%; height:700px; border:0; border-radius: 4px; " sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

----
You can see the code by clicking the blue rectangular Show Editor View button above, and also edit the example in the code editor directly.

Overview
-----
The above example makes use of some of the built in column filters provided in the `react-data-grid-addons` package. 

### Available Editors
* [Numeric filter](https://github.com/adazzle/react-data-grid/blob/master/packages/react-data-grid-addons/src/cells/headerCells/filters/NumericFilter.js) - Used here in the ID column to filter columns of numberic values.
* [Autocomplete Filter](https://github.com/adazzle/react-data-grid/blob/master/packages/react-data-grid-addons/src/cells/headerCells/filters/AutoCompleteFilter.js) - Used here in the First and Last Name columns. Used to quickly search from the possible values of the rows 
* [Multi-Select Filter](https://github.com/adazzle/react-data-grid/blob/master/packages/react-data-grid-addons/src/cells/headerCells/filters/MultiSelectFilter.js) - Used here in the Job Title column. Can be used to easily filter multiple values. 
* [Single-Select Filter](https://github.com/adazzle/react-data-grid/blob/master/packages/react-data-grid-addons/src/cells/headerCells/filters/SingleSelectFilter.js) - Used here in the Job Area column. Allows filtering by only a single value.


### Configuring the column
To make a given column filterable, set ```column.filterable = true```.
To configure which component to use as the column filterer set `column.filterRenderer` property.
For example
```javascript
 {
    key: "id",
    name: "ID",
    filterRenderer: NumericFilter
  }
```

### Configuring the autocomplete filter results
This function determines the values that will be displayed in the editors that display a list eg. the Autocomplete Editor.

```javascript
/**
 * @param string columnKey - Key property of the column being filtered
 * @returns Array with list of valid filter values
 */
function getValidFilterValues(columnKey)
```