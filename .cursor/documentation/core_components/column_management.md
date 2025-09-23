# Column Management

<details>
<summary>Relevant source files</summary>

The following files were used as context for generating this wiki page:

- [src/ColumnMetrics.js](src/ColumnMetrics.js)
- [src/ColumnMetricsMixin.js](src/ColumnMetricsMixin.js)
- [src/ColumnUtils.js](src/ColumnUtils.js)
- [src/Header.js](src/Header.js)
- [src/HeaderRow.js](src/HeaderRow.js)
- [src/__tests__/ColumnUtils.spec.js](src/__tests__/ColumnUtils.spec.js)
- [src/__tests__/Header.spec.js](src/__tests__/Header.spec.js)

</details>



## Purpose and Scope

Column management in React Data Grid encompasses the calculation, sizing, positioning, and rendering of grid columns. This system handles column width calculations, layout metrics, header rendering, and column-related utilities. The column management system is responsible for determining how columns are displayed, resized, and positioned within the grid viewport.

For information about cell rendering and row components, see [Cell and Row Components](#3.1). For details about the header system's sorting and filtering capabilities, see [Header System](#3.2).

## Architecture Overview

The column management system consists of several interconnected components that work together to handle column layout and rendering:

**Column Management System Architecture**
```mermaid
graph TD
    RDG["ReactDataGrid"] --> CMM["ColumnMetricsMixin"]
    CMM --> CM["ColumnMetrics"]
    CMM --> DM["DOMMetrics"]
    
    RDG --> H["Header"]
    H --> HR["HeaderRow"]
    HR --> HC["HeaderCell"]
    
    CM --> CU["ColumnUtils"]
    CMM --> CM
    H --> CM
    
    subgraph "Core Calculation Engine"
        CM --> recalc["recalculate()"]
        CM --> resize["resizeColumn()"]
        CM --> widths["setColumnWidths()"]
        CM --> offsets["setColumnOffsets()"]
    end
    
    subgraph "Layout Management"
        CMM --> create["createColumnMetrics()"]
        CMM --> total["getTotalWidth()"]
        CMM --> update["metricsUpdated()"]
    end
    
    subgraph "Header Rendering"
        H --> rows["getHeaderRows()"]
        HR --> cells["getCells()"]
        HR --> types["getHeaderCellType()"]
    end
```

Sources: [src/ColumnMetrics.js:1-155](), [src/ColumnMetricsMixin.js:1-119](), [src/Header.js:1-191](), [src/HeaderRow.js:1-169]()

## Column Metrics System

The `ColumnMetrics` module serves as the core calculation engine for column layout. It provides functions to compute column widths, positions, and handle resizing operations.

**Column Metrics Data Flow**
```mermaid
graph LR
    input["Column Definitions"] --> setWidths["setColumnWidths()"]
    setWidths --> calcUnalloc["Calculate Unallocated Width"]
    calcUnalloc --> setDeferred["setDefferedColumnWidths()"]
    setDeferred --> setOffsets["setColumnOffsets()"]
    setOffsets --> output["Column Metrics Object"]
    
    output --> recalc["recalculate()"]
    resize["resizeColumn()"] --> recalc
    recalc --> output
    
    subgraph "Column Metrics Object"
        cols["columns: Array"]
        width["width: number"]
        totalWidth["totalWidth: number"]
        minWidth["minColumnWidth: number"]
    end
```

The core data structures and functions include:

| Function | Purpose | Input | Output |
|----------|---------|-------|--------|
| `recalculate()` | Recalculates all column metrics | `ColumnMetricsType` | Updated metrics |
| `resizeColumn()` | Resizes a specific column | metrics, index, width | Updated metrics |
| `setColumnWidths()` | Sets widths for columns with defined widths | columns, totalWidth | Updated columns |
| `setDefferedColumnWidths()` | Sets widths for columns without defined widths | columns, unallocatedWidth, minWidth | Updated columns |
| `setColumnOffsets()` | Calculates left position for each column | columns | Updated columns with positions |

Sources: [src/ColumnMetrics.js:18-104]()

## Column Layout and Sizing

Column width calculation follows a two-phase approach: first calculating widths for columns with explicit widths, then distributing remaining space among columns without defined widths.

**Width Calculation Process**
```mermaid
flowchart TD
    start["Start with Column Definitions"] --> explicit["Process Explicit Widths"]
    explicit --> percentage["Convert Percentage Widths"]
    percentage --> remaining["Calculate Remaining Width"]
    remaining --> distribute["Distribute to Deferred Columns"]
    distribute --> positions["Calculate Column Positions"]
    positions --> complete["Complete Metrics Object"]
    
    explicit --> scrollbar["Subtract Scrollbar Size"]
    scrollbar --> remaining
    
    distribute --> minCheck["Apply Minimum Width"]
    minCheck --> positions
```

The `ColumnMetricsMixin` integrates this calculation system with React components:

- **`createColumnMetrics()`** [src/ColumnMetricsMixin.js:102-109]() - Creates initial column metrics from props
- **`getTotalWidth()`** [src/ColumnMetricsMixin.js:58-66]() - Determines total available width using DOM measurements or fallback calculation
- **`onColumnResize()`** [src/ColumnMetricsMixin.js:111-117]() - Handles column resize events and updates metrics

Sources: [src/ColumnMetrics.js:31-84](), [src/ColumnMetricsMixin.js:58-117]()

## Header Management System

The header system manages the rendering of column headers through a hierarchical component structure. The `Header` component coordinates multiple `HeaderRow` components, each responsible for rendering individual header cells.

**Header Component Hierarchy**
```mermaid
graph TD
    Header --> getHeaderRows["getHeaderRows()"]
    getHeaderRows --> HeaderRow1["HeaderRow (main)"]
    getHeaderRows --> HeaderRowN["HeaderRow (filter)"]
    
    HeaderRow1 --> getCells1["getCells()"]
    HeaderRowN --> getCells2["getCells()"]
    
    getCells1 --> BaseHeaderCell["BaseHeaderCell"]
    getCells1 --> DraggableHeaderCell["DraggableHeaderCell"]
    
    getCells2 --> FilterableHeaderCell["FilterableHeaderCell"]
    getCells2 --> SortableHeaderCell["SortableHeaderCell"]
    
    subgraph "Header Cell Types"
        NONE["HeaderCellType.NONE"]
        SORTABLE["HeaderCellType.SORTABLE"]
        FILTERABLE["HeaderCellType.FILTERABLE"]
    end
    
    getHeaderCellType["getHeaderCellType()"] --> NONE
    getHeaderCellType --> SORTABLE
    getHeaderCellType --> FILTERABLE
```

The header rendering process involves:

1. **Header Row Creation** [src/Header.js:76-120]() - Creates multiple header rows with proper positioning
2. **Cell Type Determination** [src/HeaderRow.js:56-64]() - Determines whether cells should be sortable, filterable, or plain
3. **Cell Rendering** [src/HeaderRow.js:108-138]() - Renders appropriate header cells with proper event handlers

Sources: [src/Header.js:76-120](), [src/HeaderRow.js:56-138]()

## Column Utilities

The `ColumnUtils` module provides utility functions for working with column collections, supporting both regular JavaScript arrays and Immutable.js collections.

**Column Utility Functions**
```mermaid
graph LR
    subgraph "Array Operations"
        getColumn["getColumn(columns, idx)"]
        spliceColumn["spliceColumn(metrics, idx, column)"]
        getSize["getSize(columns)"]
    end
    
    subgraph "Collection Support"
        array["Regular Arrays"]
        immutable["Immutable.js Lists"]
    end
    
    subgraph "Edit Logic"
        canEdit["canEdit(col, rowData, enableCellSelect)"]
        editorCheck["Check col.editor"]
        editableCheck["Check col.editable"]
        functionCheck["Handle Editable Function"]
    end
    
    array --> getColumn
    immutable --> getColumn
    array --> spliceColumn
    immutable --> spliceColumn
    
    canEdit --> editorCheck
    canEdit --> editableCheck
    canEdit --> functionCheck
```

Key utility functions:

- **`getColumn(columns, idx)`** [src/ColumnUtils.js:3-9]() - Safely retrieves column by index from arrays or Immutable lists
- **`spliceColumn(metrics, idx, column)`** [src/ColumnUtils.js:11-18]() - Replaces column at specified index
- **`getSize(columns)`** [src/ColumnUtils.js:20-26]() - Returns collection size regardless of type
- **`canEdit(col, rowData, enableCellSelect)`** [src/ColumnUtils.js:30-35]() - Determines if column is editable based on configuration

Sources: [src/ColumnUtils.js:1-36]()

## Column Resizing Process

Column resizing involves coordination between header components and the metrics system to provide real-time visual feedback and final metric updates.

**Column Resize Flow**
```mermaid
sequenceDiagram
    participant HC as HeaderCell
    participant HR as HeaderRow  
    participant H as Header
    participant CM as ColumnMetrics
    participant CMM as ColumnMetricsMixin
    
    HC->>HR: onResize(column, width)
    HR->>H: onColumnResize(column, width)
    H->>H: setState({resizing: metrics})
    H->>CM: ColumnMetrics.resizeColumn()
    CM->>CM: recalculate()
    CM-->>H: Updated metrics
    
    HC->>HR: onResizeEnd(column, width)
    HR->>H: onColumnResizeEnd(column, width)
    H->>CMM: onColumnResize(index, width)
    CMM->>CMM: setState({columnMetrics})
    CMM->>CMM: Props callback (optional)
```

The resize process maintains a temporary resizing state in the `Header` component [src/Header.js:47-66]() while providing immediate visual feedback, then commits the final changes through the `ColumnMetricsMixin` [src/ColumnMetricsMixin.js:111-117]().

Sources: [src/Header.js:47-74](), [src/ColumnMetricsMixin.js:111-117]()
