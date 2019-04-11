---
id: basic-grouping
title: Basic Column Grouping
---
<iframe src="https://codesandbox.io/embed/4216w14039?autoresize=1&hidenavigation=1&view=preview" style="width:100%; height:750px; border:0; border-radius: 4px; " sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

----
You can see the code by clicking the blue rectangular Show Editor View button above, and also edit the example in the code editor directly.

Overview
-----
Using the `Data.Selectors.getRows` selector from `react-data-grid-addons`, it is easy to group the grid data by columns. 

### Setting the columns to group by
To display the grid data grouped by columns, pass a `groupBy: String[] `property to the `getRows` selector
```javascript
import {Data} from 'react-data-grid-addons';

// grouping by a single column with column.key = 'col1'
const groupBy = ['col1'];
const groupedRows = Data.Selectors.getRows({rows, groupBy});

// grouping by multiple columns
const groupBy = ['col1', 'col3'];
const groupedRows = Data.Selectors.getRows({rows, groupBy});
```

You can now use the `groupedRows` as the source of your grid data 