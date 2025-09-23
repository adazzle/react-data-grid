# Overview

<details>
<summary>Relevant source files</summary>

The following files were used as context for generating this wiki page:

- [README.md](README.md)
- [src/AppConstants.js](src/AppConstants.js)
- [src/ReactDataGrid.js](src/ReactDataGrid.js)
- [src/__tests__/AppConstants.spec.js](src/__tests__/AppConstants.spec.js)
- [themes/react-data-grid.css](themes/react-data-grid.css)

</details>



## Purpose and Scope

This document provides an overview of the React Data Grid codebase, introducing its architecture, key components, and fundamental concepts. React Data Grid is an advanced JavaScript spreadsheet-like grid component built using React that provides Excel-like functionality including virtualized rendering, inline editing, keyboard navigation, and extensive customization capabilities.

For detailed installation instructions and basic usage patterns, see [Installation and Getting Started](#1.1). For comprehensive component documentation, see [Core Components](#3). For information about extending functionality, see [Plugin System and Addons](#5).

## What is React Data Grid

React Data Grid is a high-performance, feature-rich data grid component designed to handle large datasets efficiently. As described in [README.md:6](), it provides "Excel-like grid component built with React, with editors, keyboard navigation, copy & paste, and the like".

The library is distributed as two main modules as outlined in [README.md:27-47]():
- `react-data-grid` - Core grid functionality
- `react-data-grid/addons` - Extended plugins and editors

## Key Features

The grid provides comprehensive spreadsheet-like functionality including:

- **Lightning fast virtual rendering** - Can render hundreds of thousands of rows without performance degradation
- **Rich editing capabilities** - Built-in editors for various data types with custom editor support
- **Advanced navigation** - Full keyboard navigation and cell selection modes
- **Data manipulation** - Copy/paste, drag-and-drop, cell drag-down operations
- **Column management** - Resizable, sortable, filterable, and frozen columns
- **Row operations** - Row selection, grouping, and expansion capabilities
- **Extensible architecture** - Plugin system for custom formatters, editors, and UI components

## High-Level Architecture

React Data Grid follows a layered architecture with clear separation of concerns:

```mermaid
graph TB
    subgraph "Application Layer"
        APP[/"Application Code"/]
        DATA[("Data Source")]
        CALLBACKS[("Event Handlers")]
    end
    
    subgraph "Main Component Layer"  
        RDG["ReactDataGrid"]
        MIXINS["ColumnMetricsMixin<br/>KeyboardHandlerMixin<br/>DOMMetrics"]
    end
    
    subgraph "Core Rendering Layer"
        BASEGRID["BaseGrid"] 
        GRID["Grid Component"]
        HEADER["Header System"]
        VIEWPORT["Viewport"]
        CANVAS["Canvas"]
    end
    
    subgraph "Cell & Row Layer"
        HEADERROW["HeaderRow"]
        HEADERCELL["HeaderCell"] 
        ROWSCONTAINER["RowsContainer"]
        ROW["Row"]
        CELL["Cell"]
    end
    
    subgraph "Plugin System"
        PLUGINS["ReactDataGridPlugins<br/>(Global Registry)"]
        EDITORS["Editor Components"]
        FORMATTERS["Formatters & Filters"]
    end
    
    APP --> RDG
    DATA --> RDG
    CALLBACKS --> RDG
    
    RDG --> MIXINS
    RDG --> BASEGRID
    BASEGRID --> GRID
    
    GRID --> HEADER
    GRID --> VIEWPORT
    VIEWPORT --> CANVAS
    CANVAS --> ROWSCONTAINER
    
    HEADER --> HEADERROW
    HEADERROW --> HEADERCELL
    ROWSCONTAINER --> ROW  
    ROW --> CELL
    
    PLUGINS --> EDITORS
    PLUGINS --> FORMATTERS
    HEADERCELL --> PLUGINS
    CELL --> PLUGINS
```

*Sources: [src/ReactDataGrid.js:1-48](), [README.md:23-24]()*

## Component Hierarchy

The main `ReactDataGrid` component orchestrates the entire grid through a well-defined component hierarchy:

```mermaid
graph TD
    subgraph "Main Entry Point"
        ReactDataGrid["ReactDataGrid<br/>(Main Component)"]
    end
    
    subgraph "State Management & Coordination"
        STATE["State Management<br/>{selected, dragged, copied,<br/>columnMetrics, expandedRows}"]
        CELLMETA["cellMetaData<br/>(Event Coordination Object)"]
    end
    
    subgraph "Layout & Metrics"  
        METRICS["ColumnMetricsMixin<br/>.createColumnMetrics()"]
        DOMMETRICS["DOMMetrics<br/>.gridWidth()"]
    end
    
    subgraph "Event Handling"
        KEYBOARD["KeyboardHandlerMixin<br/>.onKeyDown(), .moveSelectedCell()"]
        CELLEVENTS["Cell Event Handlers<br/>.onCellClick(), .onCellCommit()"]
    end
    
    subgraph "Rendering Pipeline"
        BASEGRID["BaseGrid<br/>(Core Grid Container)"] 
        HEADERROWS["headerRows<br/>.getHeaderRows()"]
        ROWGETTER["rowGetter<br/>(Data Access)"]
    end
    
    ReactDataGrid --> STATE
    ReactDataGrid --> CELLMETA
    ReactDataGrid --> METRICS
    ReactDataGrid --> DOMMETRICS
    ReactDataGrid --> KEYBOARD
    ReactDataGrid --> CELLEVENTS
    ReactDataGrid --> BASEGRID
    ReactDataGrid --> HEADERROWS
    ReactDataGrid --> ROWGETTER
    
    STATE --> CELLMETA
    CELLMETA --> BASEGRID
    METRICS --> BASEGRID
    HEADERROWS --> BASEGRID
    ROWGETTER --> BASEGRID
```

*Sources: [src/ReactDataGrid.js:42-48](), [src/ReactDataGrid.js:124-133](), [src/ReactDataGrid.js:841-860]()*

## Plugin System Overview

React Data Grid uses a global plugin registry system that enables extensible functionality without tight coupling:

```mermaid
graph LR
    subgraph "Global Registry"
        WINDOW["window.ReactDataGridPlugins"]
        ADDONS["src/addons/index.js"]
    end
    
    subgraph "Editor Plugins"
        AUTOCOMPLETE["AutoCompleteEditor"]  
        CHECKBOX["CheckboxEditor"]
        DROPDOWN["DropDownEditor"]
        DATERANGE["DateRangeEditor"]
        SIMPLETEXT["SimpleTextEditor"]
    end
    
    subgraph "Core Components"
        CELL_COMPONENT["Cell Component"]
        HEADERCELL_COMPONENT["HeaderCell Component"] 
        EDITORCONTAINER["EditorContainer"]
    end
    
    subgraph "Usage Pattern"
        PROPS["Component Props<br/>{formatter, editor}"]
        RESOLUTION["Plugin Resolution<br/>window.ReactDataGridPlugins[name]"]
    end
    
    ADDONS --> WINDOW
    AUTOCOMPLETE --> ADDONS
    CHECKBOX --> ADDONS  
    DROPDOWN --> ADDONS
    DATERANGE --> ADDONS
    SIMPLETEXT --> ADDONS
    
    CELL_COMPONENT --> PROPS
    HEADERCELL_COMPONENT --> PROPS
    EDITORCONTAINER --> PROPS
    
    PROPS --> RESOLUTION
    RESOLUTION --> WINDOW
```

*Sources: [src/ReactDataGrid.js:7](), [README.md:27-47]()*

## Data Flow and Event System

The grid implements a centralized event coordination system using the `cellMetaData` object:

```mermaid
graph TB
    subgraph "External Interface"
        ROWGETTER["props.rowGetter()"]
        ONROWUPDATED["props.onRowUpdated()"] 
        ONGRIDROWSUPDATED["props.onGridRowsUpdated()"]
    end
    
    subgraph "Internal State"
        SELECTED["state.selected<br/>{rowIdx, idx, active}"]
        DRAGGED["state.dragged<br/>{idx, rowIdx, value}"]
        COPIED["state.copied<br/>{idx, rowIdx}"]
    end
    
    subgraph "Event Coordination"
        CELLMETADATA["cellMetaData<br/>{onCellClick, onCellCommit,<br/>onCellDoubleClick, handleDragEnter}"]
    end
    
    subgraph "User Interactions"
        CELLCLICK["Cell Click<br/>.onCellClick()"]
        CELLEDIT["Cell Edit<br/>.onCellCommit()"] 
        DRAGDROP["Drag & Drop<br/>.handleDragStart()"]
        KEYBOARD_NAV["Keyboard Nav<br/>.moveSelectedCell()"]
    end
    
    ROWGETTER --> CELLMETADATA
    SELECTED --> CELLMETADATA  
    DRAGGED --> CELLMETADATA
    COPIED --> CELLMETADATA
    
    CELLMETADATA --> CELLCLICK
    CELLMETADATA --> CELLEDIT
    CELLMETADATA --> DRAGDROP
    CELLMETADATA --> KEYBOARD_NAV
    
    CELLEDIT --> ONROWUPDATED
    DRAGDROP --> ONGRIDROWSUPDATED
    CELLCLICK --> SELECTED
    KEYBOARD_NAV --> SELECTED
```

*Sources: [src/ReactDataGrid.js:841-860](), [src/ReactDataGrid.js:289-309](), [src/ReactDataGrid.js:644-658]()*

## Update Actions and Constants

The grid defines standardized update actions for tracking data changes:

| Action | Constant | Usage |
|--------|----------|-------|  
| Cell Edit | `CELL_UPDATE` | Individual cell value changes |
| Column Fill | `COLUMN_FILL` | Drag-down fill operations |
| Copy/Paste | `COPY_PASTE` | Clipboard operations |
| Cell Drag | `CELL_DRAG` | Drag and drop cell moves |

*Sources: [src/AppConstants.js:3-10](), [src/ReactDataGrid.js:308](), [src/ReactDataGrid.js:345](), [src/ReactDataGrid.js:417](), [src/ReactDataGrid.js:387]()*

## Getting Started

To begin using React Data Grid, install the package via npm as shown in [README.md:13-14]():

```bash
npm install react-data-grid
```

The basic usage pattern involves importing the main component and providing required props including `columns`, `rowGetter`, `rowsCount`, `rowHeight`, and `minHeight`. For advanced features including rich editors and plugins, also import `react-data-grid/addons`.

For detailed setup instructions and examples, see [Installation and Getting Started](#1.1). For complete component documentation and API reference, see [API Reference](#9).

*Sources: [README.md:10-19](), [README.md:40-47](), [src/ReactDataGrid.js:50-109]()*
