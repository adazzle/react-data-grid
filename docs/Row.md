

Props
-----

### `colOverscanEndIdx` (required)

The index of the last overscan column on the grid

**type:** number  


### `colOverscanStartIdx` (required)

The index of the first overscan column on the grid

**type:** number  


### `colVisibleEndIdx` (required)

The index of the last visible column on the grid

**type:** number  


### `colVisibleStartIdx` (required)

The index of the first visible column on the grid

**type:** number  


### `columns` (required)

Array of columns to render

**type:** union (object|array) 


### `idx` (required)

The index of the row in the grid

**type:** number  


### `isScrolling` (required)

Flag to determine whether the grid is being scrolled

**type:** bool  


### `row` (required)

JS object represeting row data

**type:** object  


### `cellMetaData`

Object used to listen for cell events

**type:** object  


### `cellRenderer`

React component used to render cell content

**type:** func  

 **defaultValue:** `Cell`


### `expandedRows`

Array of all rows that have been expanded

**type:** arrayOf [object Object] 


### `extraClasses`

Space separated list of extra css classes to apply to row

**type:** string  


### `forceUpdate`

Will force an update to the row if true

**type:** bool  


### `height`

The height of the row in pixels

**type:** number  

 **defaultValue:** `35`


### `isRowHovered`

Determines whether row is hovered or not

**type:** bool  


### `isSelected`

Determines whether row is selected or not

**type:** bool  

 **defaultValue:** `false`


### `lastFrozenColumnIndex`

Index of last frozen column index

**type:** number  


### `scrollLeft`

scrollLeft in pixels

**type:** number  


### `subRowDetails`

**type:** object  

