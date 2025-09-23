# Cell and Row Components

<details>
<summary>Relevant source files</summary>

The following files were used as context for generating this wiki page:

- [src/Cell.js](src/Cell.js)
- [src/Row.js](src/Row.js)
- [src/RowsContainer.js](src/RowsContainer.js)
- [src/__tests__/Cell.spec.js](src/__tests__/Cell.spec.js)
- [src/__tests__/RowsContainer.spec.js](src/__tests__/RowsContainer.spec.js)
- [src/addons/index.js](src/addons/index.js)

</details>



This document covers the core rendering components of the react-data-grid system: the `Cell` and `Row` components, along with their container `RowsContainer`. These components form the foundation of the grid's visual presentation and handle user interactions, editing, and data display. For information about the editor system that integrates with these components, see [Editor System](#4). For details about the overall grid rendering pipeline, see [Grid Rendering System](#2.2).

## Component Architecture Overview

The cell and row rendering system follows a hierarchical structure where `RowsContainer` manages multiple `Row` components, and each `Row` manages multiple `Cell` components. The components coordinate through a shared `cellMetaData` object that handles event propagation and state management.

### Cell Component Structure

```mermaid
graph TB
    Cell["Cell Component<br/>(src/Cell.js)"] --> Content["Cell Content Rendering"]
    Cell --> Events["Event Handling System"]
    Cell --> State["Cell State Management"]
    
    Content --> Formatter["Formatter/Editor<br/>Selection"]
    Content --> Expander["Cell Expander<br/>(Tree View)"]
    Content --> DragHandle["Drag Handle"]
    
    Events --> Click["onCellClick"]
    Events --> DoubleClick["onCellDoubleClick"]
    Events --> ContextMenu["onCellContextMenu"]
    Events --> Drag["Drag Events"]
    
    State --> Selected["isSelected()"]
    State --> Active["isActive()"]
    State --> Copied["isCopied()"]
    State --> Dragged["isDraggedOver()"]
    
    Formatter --> EditorContainer["EditorContainer<br/>(Active State)"]
    Formatter --> SimpleCellFormatter["SimpleCellFormatter<br/>(Display State)"]
    Formatter --> CustomFormatter["Custom Formatter<br/>(Column Defined)"]
```

Sources: [src/Cell.js:1-480]()

### Row Component Structure

```mermaid
graph TB
    Row["Row Component<br/>(src/Row.js)"] --> CellGeneration["Cell Generation"]
    Row --> RowState["Row State Management"]
    Row --> Events["Row Event Handling"]
    
    CellGeneration --> GetCells["getCells()"]
    CellGeneration --> CellRenderer["cellRenderer Property"]
    CellGeneration --> CellExpander["CellExpander<br/>(Sub-row Details)"]
    
    RowState --> Selected["isSelected"]
    RowState --> Height["getRowHeight()"]
    RowState --> ExpandableOptions["getExpandableOptions()"]
    
    Events --> DragEnter["handleDragEnter()"]
    Events --> CellEvents["Cell Event Delegation"]
    
    GetCells --> LockedCells["Locked Cells"]
    GetCells --> RegularCells["Regular Cells"]
```

Sources: [src/Row.js:1-214]()

## Component Hierarchy and Data Flow

The following diagram shows how data and events flow between the row and cell components:

```mermaid
graph TD
    RowsContainer["RowsContainer<br/>(src/RowsContainer.js)"] --> Row["Row Component"]
    RowsContainer --> ContextMenu["Context Menu<br/>Integration"]
    
    Row --> Cell1["Cell[0]"]
    Row --> Cell2["Cell[1]"]
    Row --> Cell3["Cell[n]"]
    Row --> CellMetaData["cellMetaData<br/>Event Coordination"]
    
    CellMetaData --> Cell1
    CellMetaData --> Cell2  
    CellMetaData --> Cell3
    
    Cell1 --> EditorContainer1["EditorContainer<br/>(if active)"]
    Cell2 --> Formatter2["Formatter<br/>(if display)"]
    Cell3 --> CustomFormatter3["Custom Formatter<br/>(if defined)"]
    
    ContextMenu --> ReactDataGridPlugins["window.ReactDataGridPlugins<br/>Menu System"]
    
    subgraph "Event Flow"
        CellEvents["Cell Events<br/>(click, doubleClick, etc)"] --> CellMetaData
        CellMetaData --> GridCallbacks["Grid-level Callbacks<br/>(onCellClick, etc)"]
    end
```

Sources: [src/RowsContainer.js:16-61](), [src/Row.js:78-109](), [src/Cell.js:89-131]()

## Cell Component Lifecycle and States

The `Cell` component manages several distinct states that determine its rendering behavior and user interaction capabilities:

| State Method | Purpose | Key Properties |
|--------------|---------|----------------|
| `isSelected()` | Cell is currently selected | `cellMetaData.selected.rowIdx` and `idx` match |
| `isActive()` | Cell is in edit mode | `isSelected()` and `cellMetaData.selected.active === true` |
| `isCopied()` | Cell is in clipboard | `cellMetaData.copied` matches cell coordinates |
| `isDraggedOver()` | Cell is being dragged over | `cellMetaData.dragged.overRowIdx` matches |

### Cell State Transitions

```mermaid
stateDiagram-v2
    [*] --> Display: "Default State"
    Display --> Selected: "Cell Click"
    Selected --> Active: "Double Click / Enter"
    Active --> Selected: "Commit/Cancel Edit"
    Selected --> Display: "Click Other Cell"
    
    Display --> Copied: "Copy Action"
    Copied --> Display: "Paste/Clear"
    
    Display --> DraggedOver: "Drag Operation"
    DraggedOver --> Display: "Drag Complete"
    
    note right of Active: "Renders EditorContainer"
    note right of Display: "Renders Formatter"
    note right of Selected: "Has Focus, Shows Drag Handle"
```

Sources: [src/Cell.js:202-217](), [src/Cell.js:278-304]()

## Event Handling System

The cell and row components implement a comprehensive event system that supports both grid-level and column-level event handlers:

### Cell Event Processing

The `Cell` component's `getEvents()` method merges grid events with column-specific events:

```mermaid
graph LR
    GridEvents["Grid Events<br/>onClick, onDoubleClick<br/>onContextMenu, onDragOver"] --> EventMerge["createEventDTO()"]
    ColumnEvents["Column Events<br/>column.events"] --> EventMerge
    OnColumnEvent["cellMetaData.onColumnEvent"] --> EventMerge
    
    EventMerge --> FinalEvents["Final Event Handlers<br/>Combined Grid + Column"]
    
    subgraph "Event Flow"
        CellClick["Cell Click"] --> GridHandler["Grid Handler"]
        CellClick --> ColumnHandler["Column Handler"]
        GridHandler --> CallbackExecution["Execute Both"]
        ColumnHandler --> CallbackExecution
    end
```

Sources: [src/Cell.js:414-429](), [src/Cell.js:386-412]()

### Row Event Delegation

The `Row` component handles drag-and-drop operations and delegates cell-specific events:

- **`handleDragEnter()`**: Manages row-level drag operations [src/Row.js:54-59]()
- **Cell event propagation**: Passes `cellMetaData` to all child cells for event coordination [src/Row.js:86-99]()

## Editor Integration

When a cell becomes active (`isActive()` returns true), the rendering switches from formatters to the editor system:

### Editor vs Formatter Decision Logic

```mermaid
flowchart TD
    CellRender["Cell.getFormatter()"] --> IsActive{"isActive()"}
    IsActive -->|true| EditorContainer["<EditorContainer>"]
    IsActive -->|false| FormatterCheck{"column.formatter?"}
    
    FormatterCheck -->|exists| CustomFormatter["Custom Formatter"]
    FormatterCheck -->|none| SimpleCellFormatter["SimpleCellFormatter"]
    
    EditorContainer --> EditorProps["Props: rowData, value,<br/>column, cellMetaData"]
    CustomFormatter --> FormatterProps["Props: value,<br/>dependentValues"]
    SimpleCellFormatter --> DefaultProps["Props: value"]
```

Sources: [src/Cell.js:146-153](), [src/Cell.js:431-449]()

## Plugin System Integration

The components integrate with the global plugin system through `window.ReactDataGridPlugins`:

### RowsContainer Plugin Integration

The `RowsContainer` component demonstrates plugin usage for context menus:

```mermaid
graph TB
    RowsContainer --> PluginCheck{"hasContextMenu()"}
    PluginCheck -->|true| PluginAccess["this.plugins =<br/>window.ReactDataGridPlugins"]
    PluginAccess --> MenuPlugin["plugins.Menu.ContextMenuLayer"]
    MenuPlugin --> WrappedContainer["Context Menu Enabled<br/>SimpleRowsContainer"]
    
    PluginCheck -->|false| SimpleContainer["SimpleRowsContainer<br/>(Direct Rendering)"]
```

Sources: [src/RowsContainer.js:19-33](), [src/addons/index.js:10-11]()

## CSS Classes and Styling

The components apply dynamic CSS classes based on state:

### Cell CSS Classes

The `getCellClass()` method applies classes conditionally:

| Class Name | Condition | Purpose |
|------------|-----------|---------|
| `react-grid-Cell` | Always | Base cell styling |
| `react-grid-Cell--locked` | `column.locked` | Locked column styling |
| `row-selected` | `isRowSelected` | Row selection indicator |
| `selected` | `isSelected() && !isActive()` | Cell selection styling |
| `editing` | `isActive()` | Active edit mode styling |
| `copied` | `isCopied()` | Clipboard operation styling |
| `active-drag-cell` | `isSelected() || isDraggedOver()` | Drag operation styling |

Sources: [src/Cell.js:166-184]()

### Row CSS Classes

Row styling includes alternating row colors and selection states:

- **`react-grid-Row`**: Base row class
- **`react-grid-Row--even/odd`**: Alternating row styling based on `idx % 2`
- **`row-selected`**: Applied when `isSelected` prop is true
- **`row-context-menu`**: Applied when context menu is displayed

Sources: [src/Row.js:188-196]()

## Performance Optimizations

Both components implement `shouldComponentUpdate()` methods to minimize re-renders:

### Cell Update Conditions

The Cell component updates only when necessary properties change:
- Column width or position changes
- Height changes
- Row index changes  
- Selection state changes
- Drag/copy state changes
- Value changes
- Dependent values change (via `hasChangedDependentValues()`)

Sources: [src/Cell.js:73-87](), [src/Cell.js:236-249]()

### Row Update Conditions

The Row component optimizes updates by checking:
- Column configuration changes
- Selected cell presence in row
- Drag operations affecting row
- Row data changes
- Selection state changes

Sources: [src/Row.js:42-52]()
