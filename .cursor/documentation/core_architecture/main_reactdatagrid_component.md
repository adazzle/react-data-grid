# Main ReactDataGrid Component

<details>
<summary>Relevant source files</summary>

The following files were used as context for generating this wiki page:

- [docs/api/docs.json](docs/api/docs.json)
- [docs/markdowns/ReactDataGrid.md](docs/markdowns/ReactDataGrid.md)
- [examples/docs/markdowns/ReactDataGrid.md](examples/docs/markdowns/ReactDataGrid.md)
- [src/AppConstants.js](src/AppConstants.js)
- [src/ReactDataGrid.js](src/ReactDataGrid.js)
- [src/__tests__/AppConstants.spec.js](src/__tests__/AppConstants.spec.js)
- [themes/react-data-grid.css](themes/react-data-grid.css)

</details>



## Purpose and Scope

This document covers the main `ReactDataGrid` component, which serves as the primary entry point and orchestrator for the entire data grid system. The `ReactDataGrid` component is responsible for state management, event coordination, and rendering the complete grid interface including headers, cells, and interactive features.

For information about the underlying rendering pipeline, see [Grid Rendering System](#2.2). For details about individual cell and row components, see [Cell and Row Components](#3.1). For editor functionality, see [Editor System](#4).

## Component Overview

The `ReactDataGrid` component is defined in [src/ReactDataGrid.js]() and serves as the main interface for consumers of the data grid library. It combines multiple mixins to provide column metrics calculation, DOM measurements, and keyboard handling capabilities.

```mermaid
graph TB
    subgraph "ReactDataGrid Component"
        RDG["ReactDataGrid<br/>(React.createClass)"]
        CM["ColumnMetricsMixin"]
        DM["DOMMetrics.MetricsComputatorMixin"] 
        KH["KeyboardHandlerMixin"]
    end
    
    subgraph "Core Props"
        COLS["columns (required)"]
        ROWS["rowsCount (required)"]
        GETTER["rowGetter (required)"]
        HEIGHT["rowHeight (required)"]
        MINHEIGHT["minHeight (required)"]
    end
    
    subgraph "State Management"
        SELECTED["selected: {rowIdx, idx}"]
        DRAGGED["dragged: DraggedType"]
        COPIED["copied: {idx, rowIdx}"]
        METRICS["columnMetrics"]
        FILTERS["columnFilters"]
    end
    
    subgraph "Rendered Components"
        TOOLBAR["Toolbar (optional)"]
        BASEGRID["BaseGrid"]
    end
    
    RDG --> CM
    RDG --> DM
    RDG --> KH
    
    COLS --> RDG
    ROWS --> RDG
    GETTER --> RDG
    HEIGHT --> RDG
    MINHEIGHT --> RDG
    
    RDG --> SELECTED
    RDG --> DRAGGED
    RDG --> COPIED
    RDG --> METRICS
    RDG --> FILTERS
    
    RDG --> TOOLBAR
    RDG --> BASEGRID
```

**Sources:** [src/ReactDataGrid.js:42-48](), [src/ReactDataGrid.js:124-133]()

## Component Architecture and Mixins

The `ReactDataGrid` component utilizes three key mixins that provide essential functionality:

| Mixin | Purpose | Key Methods |
|-------|---------|-------------|
| `ColumnMetricsMixin` | Calculates column widths and positioning | `createColumnMetrics()`, `getColumn()` |
| `DOMMetrics.MetricsComputatorMixin` | Handles DOM measurements | `gridWidth()`, `DOMMetrics` |
| `KeyboardHandlerMixin` | Manages keyboard navigation and shortcuts | Arrow key handlers, `onPressTab()`, `onPressEnter()` |

```mermaid
graph LR
    subgraph "Mixin Integration"
        RDG["ReactDataGrid"]
        RDG --> CM["ColumnMetricsMixin<br/>- Column calculations<br/>- Width management"]
        RDG --> DM["DOMMetrics.MetricsComputatorMixin<br/>- DOM measurements<br/>- Grid sizing"]
        RDG --> KH["KeyboardHandlerMixin<br/>- Keyboard navigation<br/>- Shortcuts"]
    end
    
    subgraph "External Dependencies"
        BASEGRID["BaseGrid Component"]
        CHECKBOX["CheckboxEditor"]
        ROWUTILS["RowUtils"]
        COLUTILS["ColumnUtils"]
    end
    
    CM --> COLUTILS
    RDG --> BASEGRID
    RDG --> CHECKBOX
    RDG --> ROWUTILS
```

**Sources:** [src/ReactDataGrid.js:44-48](), [src/ReactDataGrid.js:1-13]()

## Props Interface

The component accepts numerous props for configuration, with several required props and many optional ones for extending functionality:

### Required Props

| Prop | Type | Purpose |
|------|------|---------|
| `columns` | `object \| array` | Column definitions with keys, names, and configuration |
| `rowsCount` | `number` | Total number of rows to display |
| `rowGetter` | `function` | Function to retrieve row data by index |
| `rowHeight` | `number` | Height of each row in pixels (default: 35) |
| `minHeight` | `number` | Minimum height of the grid (default: 350) |

### Selection and Interaction Props

| Prop | Type | Default | Purpose |
|------|------|---------|---------|
| `enableCellSelect` | `boolean` | `false` | Enable individual cell selection |
| `enableRowSelect` | `boolean \| string` | `false` | Enable row selection (true/false/'single') |
| `cellNavigationMode` | `enum` | `'none'` | Cell navigation behavior |
| `rowSelection` | `object` | - | Advanced row selection configuration |

**Sources:** [src/ReactDataGrid.js:50-109](), [src/ReactDataGrid.js:111-122]()

## State Management

The component maintains several pieces of state to coordinate user interactions and grid behavior:

```mermaid
graph TB
    subgraph "Component State"
        INIT["getInitialState()"]
        
        subgraph "Selection State"
            SELECTED["selected: {rowIdx, idx, active}"]
            COPIED["copied: {idx, rowIdx}"]
            SELECTEDROWS["selectedRows: Array<Row>"]
        end
        
        subgraph "Interaction State"
            DRAGGED["dragged: DraggedType"]
            HOVEREDROW["hoveredRowIdx: number"]
            SCROLLOFFSET["scrollOffset: number"]
        end
        
        subgraph "Data State"
            COLUMNMETRICS["columnMetrics: object"]
            EXPANDEDROWS["expandedRows: Array<Row>"]
            COLUMNFILTERS["columnFilters: object"]
        end
        
        subgraph "UI State"
            CANFILTER["canFilter: boolean"]
            SORTDIRECTION["sortDirection: SortType"]
            SORTCOLUMN["sortColumn: string"]
        end
    end
    
    INIT --> SELECTED
    INIT --> COPIED
    INIT --> SELECTEDROWS
    INIT --> DRAGGED
    INIT --> HOVEREDROW
    INIT --> SCROLLOFFSET
    INIT --> COLUMNMETRICS
    INIT --> EXPANDEDROWS
    INIT --> COLUMNFILTERS
    INIT --> CANFILTER
    INIT --> SORTDIRECTION
    INIT --> SORTCOLUMN
```

**Sources:** [src/ReactDataGrid.js:124-133]()

## Event Handling and Coordination

The `ReactDataGrid` component acts as a central event coordinator, handling user interactions and delegating to appropriate handlers:

### Cell Events

```mermaid
graph TB
    subgraph "Cell Event Flow"
        CELLCLICK["onCellClick()"]
        CELLDBLCLICK["onCellDoubleClick()"]
        CELLCONTEXT["onCellContextMenu()"]
        
        ONSELECT["onSelect()"]
        SETACTIVE["setActive()"]
        
        CELLCLICK --> ONSELECT
        CELLDBLCLICK --> ONSELECT
        CELLDBLCLICK --> SETACTIVE
        CELLCONTEXT --> ONSELECT
    end
    
    subgraph "Selection Logic"
        HASCHANGED["hasSelectedCellChanged()"]
        SETSTATE["setState({selected})"]
        CALLBACKS["onCellSelected/onCellDeSelected"]
        
        ONSELECT --> HASCHANGED
        HASCHANGED --> SETSTATE
        SETSTATE --> CALLBACKS
    end
```

### Keyboard Navigation

The component provides comprehensive keyboard navigation through inherited mixin methods:

| Key | Handler | Action |
|-----|---------|--------|
| Arrow Keys | `onPressArrow*()` | Move selection in grid |
| Tab | `onPressTab()` | Move to next/previous cell |
| Enter | `onPressEnter()` | Activate cell for editing |
| Delete/Backspace | `onPressDelete()/onPressBackspace()` | Clear cell and enter edit mode |
| Ctrl+C/Ctrl+V | `onPressKeyWithCtrl()` | Copy/paste operations |

**Sources:** [src/ReactDataGrid.js:213-277](), [src/ReactDataGrid.js:189-207]()

## cellMetaData Object

A critical aspect of the component architecture is the `cellMetaData` object, which serves as a communication mechanism between the main component and child components:

```mermaid
graph TB
    subgraph "cellMetaData Structure"
        METADATA["cellMetaData Object"]
        
        subgraph "State References"
            SELECTED["selected"]
            DRAGGED["dragged"] 
            COPIED["copied"]
            HOVERED["hoveredRowIdx"]
        end
        
        subgraph "Event Handlers"
            CELLCLICK["onCellClick"]
            CELLCONTEXT["onCellContextMenu"]
            CELLDBLCLICK["onCellDoubleClick"]
            COMMIT["onCommit"]
            COMMITCANCEL["onCommitCancel"]
        end
        
        subgraph "Feature Handlers"
            COLUMNVENT["onColumnEvent"]
            OPENEDITOR["openCellEditor"]
            DRAGHANDLE["onDragHandleDoubleClick"]
            CELLEXPAND["onCellExpand"]
            ROWEXPAND["onRowExpandToggle"]
            ROWHOVER["onRowHover"]
        end
        
        subgraph "Drag & Drop"
            DRAGENTER["handleDragEnterRow"]
            DRAGTERM["handleTerminateDrag"]
        end
    end
    
    METADATA --> SELECTED
    METADATA --> DRAGGED
    METADATA --> COPIED
    METADATA --> HOVERED
    
    METADATA --> CELLCLICK
    METADATA --> CELLCONTEXT
    METADATA --> CELLDBLCLICK
    METADATA --> COMMIT
    METADATA --> COMMITCANCEL
    
    METADATA --> COLUMNVENT
    METADATA --> OPENEDITOR
    METADATA --> DRAGHANDLE
    METADATA --> CELLEXPAND
    METADATA --> ROWEXPAND
    METADATA --> ROWHOVER
    
    METADATA --> DRAGENTER
    METADATA --> DRAGTERM
```

**Sources:** [src/ReactDataGrid.js:841-860]()

## Grid Column Setup

The component dynamically configures columns based on props, potentially adding selection columns:

```mermaid
graph TB
    subgraph "Column Setup Process"
        SETUP["setupGridColumns()"]
        BASECOLS["props.columns"]
        
        CHECKSELECT{{"Row selection enabled?"}}
        CHECKSINGLE{{"Single selection?"}}
        
        ADDCOLUMN["Add selection column"]
        HEADERRENDER["Create header renderer"]
        FORMATTER["Set formatter (CheckboxEditor)"]
        
        FINALCOLS["Final column array"]
    end
    
    SETUP --> BASECOLS
    BASECOLS --> CHECKSELECT
    CHECKSELECT -->|Yes| CHECKSINGLE
    CHECKSELECT -->|No| FINALCOLS
    CHECKSINGLE -->|No| HEADERRENDER
    CHECKSINGLE -->|Yes| ADDCOLUMN
    HEADERRENDER --> ADDCOLUMN
    ADDCOLUMN --> FORMATTER
    FORMATTER --> FINALCOLS
```

**Sources:** [src/ReactDataGrid.js:796-822]()

## Render Method and Component Integration

The `render()` method orchestrates the final grid assembly:

```mermaid
graph TB
    subgraph "Render Process"
        RENDER["render()"]
        
        subgraph "Setup Phase"
            METADATA["Create cellMetaData"]
            TOOLBAR["Render toolbar"]
            CALCWIDTH["Calculate widths"]
        end
        
        subgraph "BaseGrid Props"
            HEADERROWS["getHeaderRows()"]
            COLUMNMETRICS["state.columnMetrics"]
            SELECTEDROWS["getSelectedRows()"]
            ROWSELECTION["getRowSelectionProps()"]
            EXPANDEDROWS["state.expandedRows"]
            ROWOFFSET["getRowOffsetHeight()"]
        end
        
        subgraph "Final Render"
            CONTAINER["react-grid-Container"]
            MAIN["react-grid-Main"]
            BASEGRID["BaseGrid component"]
        end
    end
    
    RENDER --> METADATA
    RENDER --> TOOLBAR
    RENDER --> CALCWIDTH
    
    RENDER --> HEADERROWS
    RENDER --> COLUMNMETRICS
    RENDER --> SELECTEDROWS
    RENDER --> ROWSELECTION
    RENDER --> EXPANDEDROWS
    RENDER --> ROWOFFSET
    
    METADATA --> BASEGRID
    HEADERROWS --> BASEGRID
    COLUMNMETRICS --> BASEGRID
    SELECTEDROWS --> BASEGRID
    ROWSELECTION --> BASEGRID
    EXPANDEDROWS --> BASEGRID
    ROWOFFSET --> BASEGRID
    
    TOOLBAR --> CONTAINER
    BASEGRID --> MAIN
    MAIN --> CONTAINER
```

**Sources:** [src/ReactDataGrid.js:840-901]()
