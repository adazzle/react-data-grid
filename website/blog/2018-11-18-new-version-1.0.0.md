---
title: Tackling performance issues in ReactDataGrid
author: Conor Malone
authorURL: https://github.com/malonecj
authorImageURL: https://media.licdn.com/dms/image/C4E03AQEk4UoXg1w95g/profile-displayphoto-shrink_100_100/0?e=1548288000&v=beta&t=Nx8122TzbykEzDezQYWJI9vaaPBDM8VI12-7xdstZ1w
---

ReactDataGrid V5 brought about a large rewrite of the core architecture with the main goal to improve performance of the grid. These performance issues were most noticable in use cases where many rows and columns needed to be rendered to the screen, as well as when custom cell formatters were used to display the cell content. For cell formatters which were expensive to render, this could dramatically degrade grid performance for operations such as scrolling and cell navigation. It was clear to the naked eye that these issues were present in some of our production applications. We needed a solution to measure, and solve the performance problems once and for all.

### Identifying the problems
When using ReactDataGrid in our production environment for very large datasets, we could see performance degredation for the following situations
 - Changing cells by navigating with the arrow keys of the keyboard
 - Scrolling vertically for grids which had many columns
 - Scrolling horizontally for grids which had many rows
 - Updating cell values by dragging the drag handle of a cell upwards or downwards

