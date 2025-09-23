# Advanced Examples

<details>
<summary>Relevant source files</summary>

The following files were used as context for generating this wiki page:

- [examples/scripts/example13-all-features.js](examples/scripts/example13-all-features.js)
- [examples/scripts/example14-all-features-immutable.js](examples/scripts/example14-all-features-immutable.js)
- [src/addons/cells/headerCells/FilterableHeaderCell.js](src/addons/cells/headerCells/FilterableHeaderCell.js)

</details>



## Purpose and Scope

This document covers complex implementations of react-data-grid that demonstrate multiple features working together in production-ready scenarios. These examples showcase comprehensive data grid functionality including custom editors, formatters, toolbars, context menus, drag operations, and large dataset handling.

For basic grid setup and simple examples, see [Basic Examples](#7.1). For detailed information about specific features like filtering and sorting, see [Advanced Features](#6).

## Comprehensive Feature Integration

The advanced examples demonstrate how react-data-grid's plugin architecture enables sophisticated data grid applications. The primary advanced examples are:

| Example | File | Key Features |
|---------|------|--------------|
| All Features | `example13-all-features.js` | Custom editors, formatters, toolbar, large datasets |
| All Features (Immutable) | `example14-all-features-immutable.js` | Immutable.js integration, context menus, drag operations |

### All Features Example Architecture

The comprehensive example in [examples/scripts/example13-all-features.js]() demonstrates a production-ready grid implementation:

```mermaid
graph TB
    subgraph "Data Generation Layer"
        FAKER["faker.js Library"]
        CREATE_ROWS["createRows()"]
        CREATE_FAKE["createFakeRowObjectData()"]
    end
    
    subgraph "Column Configuration"
        COLUMNS["columns Array"]
        EDITORS_CONFIG["Editor Configurations"]
        FORMATTERS_CONFIG["Formatter Configurations"]
    end
    
    subgraph "React Component"
        EXAMPLE["Example Component"]
        STATE["Component State"]
        GET_COLUMNS["getColumns()"]
        HANDLE_UPDATE["handleGridRowsUpdated()"]
        HANDLE_ADD["handleAddRow()"]
    end
    
    subgraph "ReactDataGrid Props"
        RDG["ReactDataGrid"]
        TOOLBAR["Toolbar Plugin"]
        ROW_GETTER["rowGetter"]
        EVENT_HANDLERS["Event Handlers"]
    end
    
    subgraph "Plugin Integrations"
        AUTO_COMPLETE["AutoCompleteEditor"]
        DROPDOWN["DropDownEditor"]
        IMAGE_FORMAT["ImageFormatter"]
        TOOLBAR_COMP["Toolbar Component"]
    end
    
    FAKER --> CREATE_FAKE
    CREATE_FAKE --> CREATE_ROWS
    CREATE_ROWS --> STATE
    
    COLUMNS --> EDITORS_CONFIG
    COLUMNS --> FORMATTERS_CONFIG
    EDITORS_CONFIG --> GET_COLUMNS
    FORMATTERS_CONFIG --> GET_COLUMNS
    
    EXAMPLE --> STATE
    EXAMPLE --> GET_COLUMNS
    EXAMPLE --> HANDLE_UPDATE
    EXAMPLE --> HANDLE_ADD
    
    GET_COLUMNS --> RDG
    STATE --> ROW_GETTER
    ROW_GETTER --> RDG
    HANDLE_UPDATE --> EVENT_HANDLERS
    HANDLE_ADD --> EVENT_HANDLERS
    EVENT_HANDLERS --> RDG
    
    RDG --> AUTO_COMPLETE
    RDG --> DROPDOWN
    RDG --> IMAGE_FORMAT
    RDG --> TOOLBAR_COMP
    TOOLBAR_COMP --> TOOLBAR
    TOOLBAR --> RDG
```

**Sources:** [examples/scripts/example13-all-features.js:1-255]()

### Advanced Editor Integration

The examples demonstrate sophisticated editor configuration using the plugin system:

```mermaid
graph LR
    subgraph "Data Sources"
        COUNTIES["counties Array"]
        TITLES["titles Array"]
        FAKER_DATA["Faker Generated Data"]
    end
    
    subgraph "Column Definitions"
        ID_COL["ID Column"]
        AVATAR_COL["Avatar Column"]
        COUNTY_COL["County Column"]
        TITLE_COL["Title Column"]
        EDITABLE_COLS["Editable Text Columns"]
    end
    
    subgraph "Editor Components"
        AUTO_EDITOR["AutoCompleteEditor"]
        DROP_EDITOR["DropDownEditor"]
        SIMPLE_EDITOR["Simple Text Editor"]
    end
    
    subgraph "Formatter Components"
        IMAGE_FORMATTER["ImageFormatter"]
        DEFAULT_FORMATTER["Default Text Formatter"]
    end
    
    COUNTIES --> AUTO_EDITOR
    TITLES --> DROP_EDITOR
    FAKER_DATA --> SIMPLE_EDITOR
    
    AUTO_EDITOR --> COUNTY_COL
    DROP_EDITOR --> TITLE_COL
    SIMPLE_EDITOR --> EDITABLE_COLS
    
    IMAGE_FORMATTER --> AVATAR_COL
    DEFAULT_FORMATTER --> ID_COL
    DEFAULT_FORMATTER --> EDITABLE_COLS
```

**Sources:** [examples/scripts/example13-all-features.js:41-179](), [examples/scripts/example13-all-features.js:75-179]()

## Immutable.js Integration Pattern

The immutable example demonstrates advanced state management patterns:

### Immutable Data Flow Architecture

```mermaid
graph TD
    subgraph "Data Layer"
        FAKE_STORE["FakeObjectDataStore"]
        IMMUTABLE_LIST["Immutable.List columns"]
        IMMUTABLE_ROWS["Immutable.fromJS rows"]
    end
    
    subgraph "Component State Management"
        COMPONENT["Component"]
        INITIAL_STATE["getInitialState()"]
        ROW_UPDATED["handleRowUpdated()"]
        CELL_DRAG["handleCellDrag()"]
        CELL_COPY["handleCellCopyPaste()"]
        ADD_ROW["handleAddRow()"]
    end
    
    subgraph "Immutable Operations"
        UPDATE_OP["rows.update()"]
        SET_OP["r.set()"]
        MERGE_OP["r.merge()"]
        PUSH_OP["rows.push()"]
    end
    
    subgraph "Grid Integration"
        ROW_GETTER["getRowAt()"]
        GET_SIZE["getSize()"]
        REACT_DATA_GRID["ReactDataGrid"]
    end
    
    FAKE_STORE --> INITIAL_STATE
    INITIAL_STATE --> IMMUTABLE_ROWS
    IMMUTABLE_LIST --> REACT_DATA_GRID
    
    COMPONENT --> ROW_UPDATED
    COMPONENT --> CELL_DRAG
    COMPONENT --> CELL_COPY
    COMPONENT --> ADD_ROW
    
    ROW_UPDATED --> MERGE_OP
    CELL_DRAG --> SET_OP
    CELL_COPY --> SET_OP
    ADD_ROW --> PUSH_OP
    
    MERGE_OP --> UPDATE_OP
    SET_OP --> UPDATE_OP
    PUSH_OP --> IMMUTABLE_ROWS
    UPDATE_OP --> IMMUTABLE_ROWS
    
    IMMUTABLE_ROWS --> ROW_GETTER
    IMMUTABLE_ROWS --> GET_SIZE
    ROW_GETTER --> REACT_DATA_GRID
    GET_SIZE --> REACT_DATA_GRID
```

**Sources:** [examples/scripts/example14-all-features-immutable.js:160-234]()

## Context Menu Integration

The immutable example includes advanced context menu functionality:

### Context Menu Component Structure

The `MyContextMenu` component demonstrates custom context menu integration:

```mermaid
graph TB
    subgraph "Context Menu System"
        CONTEXT_MENU["ContextMenu Component"]
        MENU_ITEM["MenuItem Component"]
        MY_CONTEXT["MyContextMenu"]
    end
    
    subgraph "Event Handling"
        ON_ITEM_CLICK["onItemClick()"]
        PROPS_DATA["props.rowIdx, props.idx"]
    end
    
    subgraph "ReactDataGrid Integration"
        RDG_PROP["contextMenu prop"]
        GRID_COMPONENT["ReactDataGrid"]
    end
    
    MY_CONTEXT --> CONTEXT_MENU
    MY_CONTEXT --> MENU_ITEM
    MY_CONTEXT --> ON_ITEM_CLICK
    
    PROPS_DATA --> MENU_ITEM
    ON_ITEM_CLICK --> MENU_ITEM
    
    MY_CONTEXT --> RDG_PROP
    RDG_PROP --> GRID_COMPONENT
```

**Sources:** [examples/scripts/example14-all-features-immutable.js:147-158](), [examples/scripts/example14-all-features-immutable.js:217]()

## Advanced Event Handling Patterns

Both examples demonstrate sophisticated event handling for complex user interactions:

### Event Handler Configuration

| Event Type | Handler Function | Purpose |
|------------|------------------|---------|
| `onGridRowsUpdated` | `handleGridRowsUpdated()` | Batch row updates |
| `onRowUpdated` | `handleRowUpdated()` | Single row updates with Immutable |
| `onCellsDragged` | `handleCellDrag()` | Cell drag operations |
| `onCellCopyPaste` | `handleCellCopyPaste()` | Copy/paste functionality |
| `onClick` | Custom column events | Column-specific interactions |
| `onDoubleClick` | Custom column events | Column-specific interactions |

### Column Event Configuration

The examples show how to attach custom events to specific columns:

```mermaid
graph LR
    subgraph "Column Configuration"
        COLUMNS["columns Array"]
        GET_COLUMNS["getColumns()"]
        CLONED_COLS["clonedColumns"]
    end
    
    subgraph "Event Attachment"
        EVENTS_PROP["column.events"]
        ON_CLICK["onClick Handler"]
        ON_DOUBLE_CLICK["onDoubleClick Handler"]
    end
    
    subgraph "Grid Integration"
        OPEN_EDITOR["refs.grid.openCellEditor()"]
        EVENT_ARGS["args.idx, args.rowIdx"]
    end
    
    COLUMNS --> GET_COLUMNS
    GET_COLUMNS --> CLONED_COLS
    CLONED_COLS --> EVENTS_PROP
    
    EVENTS_PROP --> ON_CLICK
    EVENTS_PROP --> ON_DOUBLE_CLICK
    
    ON_CLICK --> OPEN_EDITOR
    EVENT_ARGS --> OPEN_EDITOR
```

**Sources:** [examples/scripts/example13-all-features.js:189-200](), [examples/scripts/example13-all-features.js:103-107]()

## Performance Optimization Features

The advanced examples demonstrate performance optimization techniques for large datasets:

### Large Dataset Configuration

| Feature | Configuration | Value | Purpose |
|---------|---------------|-------|---------|
| Row Count | `rowsCount` | 2000+ | Large dataset testing |
| Row Height | `rowHeight` | 50px | Consistent virtualization |
| Min Height | `minHeight` | 600px | Viewport optimization |
| Scroll Timeout | `rowScrollTimeout` | 200ms | Debounced scrolling |

### Virtualization Integration

The examples leverage the grid's virtualization system through proper data accessor patterns:

```mermaid
graph TD
    subgraph "Data Management"
        ROWS_STATE["this.state.rows"]
        GET_SIZE["getSize()"]
        GET_ROW_AT["getRowAt()"]
    end
    
    subgraph "ReactDataGrid Props"
        ROW_GETTER["rowGetter prop"]
        ROWS_COUNT["rowsCount prop"]
        RDG["ReactDataGrid"]
    end
    
    subgraph "Virtualization Engine"
        VIEWPORT["Viewport Component"]
        CANVAS["Canvas Component"]
        ROW_RENDERING["Row Rendering"]
    end
    
    ROWS_STATE --> GET_SIZE
    ROWS_STATE --> GET_ROW_AT
    
    GET_ROW_AT --> ROW_GETTER
    GET_SIZE --> ROWS_COUNT
    
    ROW_GETTER --> RDG
    ROWS_COUNT --> RDG
    
    RDG --> VIEWPORT
    VIEWPORT --> CANVAS
    CANVAS --> ROW_RENDERING
```

**Sources:** [examples/scripts/example13-all-features.js:224-233](), [examples/scripts/example13-all-features.js:241-242]()

## Plugin Integration Patterns

The examples demonstrate comprehensive plugin usage through the global registry:

### Plugin Registry Access

Both examples access plugins through the global `ReactDataGridPlugins` object:

| Plugin Category | Access Pattern | Examples |
|----------------|----------------|----------|
| Editors | `ReactDataGridPlugins.Editors` | `AutoComplete`, `DropDownEditor` |
| Formatters | `ReactDataGridPlugins.Formatters` | `ImageFormatter` |
| Toolbar | `ReactDataGridPlugins.Toolbar` | `Toolbar` |
| Menu | `ReactDataGridPlugins.Menu` | `ContextMenu`, `MenuItem` |

**Sources:** [examples/scripts/example13-all-features.js:6-9](), [examples/scripts/example14-all-features-immutable.js:5-11]()
