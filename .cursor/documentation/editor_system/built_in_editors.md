# Built-in Editors

<details>
<summary>Relevant source files</summary>

The following files were used as context for generating this wiki page:

- [src/addons/editors/AutoCompleteEditor.js](src/addons/editors/AutoCompleteEditor.js)
- [src/addons/editors/CheckboxEditor.js](src/addons/editors/CheckboxEditor.js)
- [src/addons/editors/DateRangeEditor.js](src/addons/editors/DateRangeEditor.js)
- [src/addons/editors/__tests__/AutoCompleteEditor.spec.js](src/addons/editors/__tests__/AutoCompleteEditor.spec.js)
- [src/addons/editors/__tests__/CheckboxEditor.spec.js](src/addons/editors/__tests__/CheckboxEditor.spec.js)
- [src/addons/editors/index.js](src/addons/editors/index.js)
- [src/addons/editors/widgets/DateRangeFilter.js](src/addons/editors/widgets/DateRangeFilter.js)

</details>



This document covers the built-in editor components provided by react-data-grid for cell editing functionality. These editors handle different data types and input patterns within grid cells. For information about the editor lifecycle and management system, see [EditorContainer and Editor Lifecycle](#4.1).

## Overview

React-data-grid provides several pre-built editor components that can be used for in-cell editing. These editors are organized as a collection in the addons system and support various data types including text, boolean, date ranges, and autocomplete functionality.

The main editor collection is exported from [src/addons/editors/index.js:1-8]() and includes:

| Editor | Purpose | Data Type |
|--------|---------|-----------|
| `CheckboxEditor` | Boolean value selection | Boolean |
| `AutoCompleteEditor` | Text input with suggestions | String/Object |
| `DropDownEditor` | Selection from predefined options | String |
| `SimpleTextEditor` | Basic text input | String |
| `DateRangeEditor` | Date range selection | Date range object |

Sources: [src/addons/editors/index.js:1-8]()

## Editor Architecture

The following diagram shows how the built-in editors relate to the grid system and plugin architecture:

```mermaid
graph TB
    subgraph "ReactDataGridPlugins Registry"
        PLUGINS["window.ReactDataGridPlugins"]
        ADDONS["src/addons/index.js"]
    end
    
    subgraph "Editor Collection"
        EDITOR_INDEX["src/addons/editors/index.js<br/>Editors Object"]
        CHECKBOX["CheckboxEditor"]
        AUTOCOMPLETE["AutoCompleteEditor"] 
        DROPDOWN["DropDownEditor"]
        SIMPLETEXT["SimpleTextEditor"]
        DATERANGE["DateRangeEditor"]
    end
    
    subgraph "Grid Components"
        CELL["Cell Component"]
        EDITOR_CONTAINER["EditorContainer"]
        COLUMN["Column Definition"]
    end
    
    subgraph "Editor Dependencies"
        REACT_AUTO["ron-react-autocomplete"]
        DATEFILTER["DateRangeFilter Widget"]
        MOMENT["Moment.js"]
        JQUERY["jQuery"]
    end
    
    ADDONS --> PLUGINS
    EDITOR_INDEX --> ADDONS
    
    CHECKBOX --> EDITOR_INDEX
    AUTOCOMPLETE --> EDITOR_INDEX
    DROPDOWN --> EDITOR_INDEX
    SIMPLETEXT --> EDITOR_INDEX
    DATERANGE --> EDITOR_INDEX
    
    PLUGINS --> CELL
    CELL --> EDITOR_CONTAINER
    COLUMN --> EDITOR_CONTAINER
    
    AUTOCOMPLETE --> REACT_AUTO
    DATERANGE --> DATEFILTER
    DATEFILTER --> MOMENT
    DATEFILTER --> JQUERY
    
    style PLUGINS fill:#f9f9f9
    style EDITOR_INDEX fill:#e1f5fe
    style CELL fill:#fff3e0
```

Sources: [src/addons/editors/index.js:1-8](), [src/addons/editors/AutoCompleteEditor.js:1-4](), [src/addons/editors/DateRangeEditor.js:1-4]()

## CheckboxEditor

The `CheckboxEditor` provides a simple boolean input mechanism using a checkbox interface.

### Implementation Details

The CheckboxEditor component structure:

```mermaid
graph TD
    CHECK["CheckboxEditor<br/>React.createClass"]
    PROPS["Props<br/>value: bool<br/>rowIdx: number<br/>column: object<br/>dependentValues: object"]
    RENDER["render()<br/>Returns checkbox container"]
    HANDLE["handleChange(e)<br/>Calls column.onCellChange"]
    
    CHECK --> PROPS
    CHECK --> RENDER  
    CHECK --> HANDLE
    
    RENDER --> INPUT["input.react-grid-checkbox<br/>type='checkbox'"]
    RENDER --> LABEL["label.react-grid-checkbox-label"]
    RENDER --> CONTAINER["div.react-grid-checkbox-container<br/>onClick handler"]
    
    HANDLE --> CALLBACK["column.onCellChange(rowIdx, key, dependentValues, event)"]
```

Key implementation details from [src/addons/editors/CheckboxEditor.js:15-27]():
- The `handleChange` method calls `this.props.column.onCellChange` with row index, column key, dependent values, and the event
- The checkbox state is derived from `this.props.value`, defaulting to `false` if null
- Click handling is attached to the container div rather than the input directly

Sources: [src/addons/editors/CheckboxEditor.js:1-30]()

## AutoCompleteEditor

The `AutoCompleteEditor` provides sophisticated autocomplete functionality using the `ron-react-autocomplete` library.

### Core Methods

The AutoCompleteEditor has several key methods for managing autocomplete behavior:

| Method | Purpose | Return Type |
|--------|---------|-------------|
| `getValue()` | Extracts current editor value | Object |
| `getLabel(item)` | Formats display labels | String |
| `hasResults()` | Checks if suggestions exist | Boolean |
| `isFocusedOnSuggestion()` | Checks suggestion focus state | Boolean |
| `constuctValueFromParams(obj, props)` | Builds pipe-separated values | String |

### Value Construction Logic

The `getValue()` method at [src/addons/editors/AutoCompleteEditor.js:38-52]() implements complex value resolution:

1. If results exist and a suggestion is focused, use the focused value
2. If `valueParams` are provided, construct a pipe-separated string from specified object properties
3. Otherwise, use the raw search term
4. Return an object keyed by `column.key`

### Display Value Handling

The `getEditorDisplayValue()` method at [src/addons/editors/AutoCompleteEditor.js:54-63]() supports custom display formatting:
- Uses `editorDisplayValue` prop function if provided
- Falls back to raw value display
- Returns formatted object for ReactAutocomplete component

Sources: [src/addons/editors/AutoCompleteEditor.js:1-107]()

## DateRangeEditor

The `DateRangeEditor` handles date range input using a sophisticated date picker widget.

### Architecture

```mermaid
graph TB
    DATE_EDITOR["DateRangeEditor<br/>React.createClass"]
    DATE_FILTER["DateRangeFilter<br/>Widget Component"] 
    DATE_PICKER["DateRangePicker<br/>jQuery Plugin"]
    
    subgraph "Props & Configuration"
        FORMAT["format: 'YYYY-MM-DD'"]
        RANGES["ranges: Array<Date>"]
        VALUE["value: {startDate, endDate}"]
    end
    
    subgraph "Methods & Validation"
        VALIDATE["validate(value)<br/>Date range validation"]
        IS_VALID["isDateValid(date)<br/>Moment.js validation"]
        GET_VALUE["getValue()<br/>Parse date range string"]
    end
    
    DATE_EDITOR --> DATE_FILTER
    DATE_FILTER --> DATE_PICKER
    
    FORMAT --> DATE_EDITOR
    RANGES --> DATE_EDITOR
    VALUE --> DATE_EDITOR
    
    DATE_EDITOR --> VALIDATE
    DATE_EDITOR --> IS_VALID
    DATE_EDITOR --> GET_VALUE
    
    VALIDATE --> IS_VALID
    GET_VALUE --> PARSE["Split on ' - ' separator"]
```

### Validation Logic

The DateRangeEditor implements multi-level validation at [src/addons/editors/DateRangeEditor.js:49-54]():

1. **Individual Date Validation**: Uses `isDateValid()` to check each date against the specified format
2. **Range Validation**: Ensures start date is before or equal to end date using Moment.js comparison
3. **Format Validation**: The `getValue()` method expects exactly two dates separated by `' - '`

### Integration with DateRangeFilter

The DateRangeEditor delegates most UI functionality to the `DateRangeFilter` widget, which wraps a jQuery-based date picker. The filter handles:
- Calendar display and navigation
- Date selection interactions  
- Apply/cancel operations
- Custom date range definitions

Sources: [src/addons/editors/DateRangeEditor.js:1-70](), [src/addons/editors/widgets/DateRangeFilter.js:1137-1201]()

## Editor Integration Pattern

All built-in editors follow a consistent integration pattern with the grid system:

```mermaid
graph LR
    COLUMN["Column Definition<br/>editor property"]
    EDITOR_CONTAINER["EditorContainer<br/>Manages editor lifecycle"]
    EDITOR_IMPL["Editor Implementation<br/>(CheckboxEditor, etc.)"]
    CELL_CHANGE["onCellChange Callback<br/>Updates grid data"]
    
    COLUMN --> EDITOR_CONTAINER
    EDITOR_CONTAINER --> EDITOR_IMPL
    EDITOR_IMPL --> CELL_CHANGE
    
    subgraph "Common Editor Props"
        VALUE["value: current cell value"]
        ROW_IDX["rowIdx: row index"]
        COL_DEF["column: column definition"]
        ON_COMMIT["onCommit: commit callback"]
    end
    
    VALUE --> EDITOR_IMPL
    ROW_IDX --> EDITOR_IMPL  
    COL_DEF --> EDITOR_IMPL
    ON_COMMIT --> EDITOR_IMPL
```

### Common Props Interface

All editors receive a standard set of props for grid integration:
- `value`: The current cell value to edit
- `rowIdx`: Zero-based row index for the cell
- `column`: Column definition object containing metadata and callbacks
- `onCommit`: Callback function to commit the edited value

The `column` prop typically includes:
- `key`: Column identifier for data binding
- `onCellChange`: Callback for immediate value changes (used by CheckboxEditor)

Sources: [src/addons/editors/CheckboxEditor.js:5-13](), [src/addons/editors/AutoCompleteEditor.js:13-26]()
