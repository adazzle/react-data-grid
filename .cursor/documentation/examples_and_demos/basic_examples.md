# Basic Examples

<details>
<summary>Relevant source files</summary>

The following files were used as context for generating this wiki page:

- [examples/assets/css/main.css](examples/assets/css/main.css)
- [examples/assets/images/datagrid1.png](examples/assets/images/datagrid1.png)
- [examples/components/Navbar.js](examples/components/Navbar.js)
- [examples/examples.html](examples/examples.html)
- [examples/examples.js](examples/examples.js)
- [examples/index.html](examples/index.html)

</details>



This page documents the basic examples system in the React Data Grid project, including the structure of example files, the routing system, and how examples are organized and displayed. These examples serve as practical demonstrations of core grid functionality for users getting started with the library.

For more complex implementations featuring all advanced features, see [Advanced Examples](#7.2). For understanding the underlying component architecture, see [Core Architecture](#2).

## Example System Architecture

The examples system is built as a standalone React application that demonstrates various grid configurations and features. The system uses React Router for navigation between different example implementations.

```mermaid
graph TB
    subgraph "HTML Entry Points"
        INDEX["index.html<br/>Landing Page"]
        EXAMPLES["examples.html<br/>Examples Viewer"]
    end
    
    subgraph "React Application"
        APP["App Component<br/>examples.js"]
        ROUTER["ReactRouter<br/>Route Management"]
        NAVBAR["Navbar Component<br/>Navigation"]
        EXLIST["ExampleList Component<br/>Example Links"]
    end
    
    subgraph "Example Scripts"
        SCRIPTS["ExampleScripts<br/>scripts/index.js"]
        MODULES["Individual Example Modules<br/>Route Handlers"]
    end
    
    subgraph "Build System"
        BUILD["build/examples.js<br/>Compiled Examples"]
        SHARED["build/shared.js<br/>Common Code"]
        GRIDJS["build/react-data-grid.js<br/>Grid Library"]
        PLUGINS["build/react-data-grid.ui-plugins.js<br/>Plugin Library"]
    end
    
    INDEX --> EXAMPLES
    EXAMPLES --> APP
    APP --> ROUTER
    APP --> NAVBAR
    NAVBAR --> EXLIST
    ROUTER --> SCRIPTS
    SCRIPTS --> MODULES
    
    BUILD --> APP
    SHARED --> APP
    GRIDJS --> MODULES
    PLUGINS --> MODULES
    
    style INDEX fill:#f9f9f9
    style EXAMPLES fill:#f9f9f9
    style APP fill:#e8f4f8
    style SCRIPTS fill:#fff2e8
```

Sources: [examples/index.html:1-190](), [examples/examples.html:1-64](), [examples/examples.js:1-34](), [examples/components/Navbar.js:1-43]()

## Example Loading and Routing System

The examples use a dynamic routing system where each example is loaded as a separate module and mapped to a specific route. This allows for modular organization of examples and easy navigation between different demonstrations.

```mermaid
graph LR
    subgraph "Route Generation Process"
        SCRIPTS["ExampleScripts Array<br/>scripts/index.js"]
        MAPPER["Route Mapper<br/>examples.js:20-23"]
        ROUTES["Generated Routes<br/>React Router Routes"]
    end
    
    subgraph "Example Structure"
        EXAMPLE["Individual Example<br/>{hashLocation, module}"]
        HANDLER["Route Handler<br/>React Component"]
        MODULE["Example Module<br/>Grid Implementation"]
    end
    
    subgraph "Navigation Components"
        NAVBAR["Navbar Dropdown<br/>Example Links"]
        SIDEBAR["Sidebar Navigation<br/>ExampleList"]
    end
    
    SCRIPTS --> MAPPER
    MAPPER --> ROUTES
    SCRIPTS --> EXAMPLE
    EXAMPLE --> HANDLER
    HANDLER --> MODULE
    
    SCRIPTS --> NAVBAR
    SCRIPTS --> SIDEBAR
    
    ROUTES --> HANDLER
    
    style SCRIPTS fill:#fff2e8
    style MAPPER fill:#e8f4f8
    style MODULE fill:#f0f8e8
```

Sources: [examples/examples.js:20-29](), [examples/examples.js:31-34](), [examples/components/Navbar.js:27-30]()

## HTML Structure and Asset Loading

The examples system uses two main HTML entry points that load the necessary dependencies and provide the structure for displaying examples.

| HTML File | Purpose | Target Element | Key Dependencies |
|-----------|---------|----------------|------------------|
| `index.html` | Landing page with grid showcase | `#grid-examples-div` | React, Grid library, Basic styling |
| `examples.html` | Full examples viewer | `#example`, `#grid-examples-div` | React Router, All plugins, CodeMirror |

### Key Asset Loading Pattern

Both HTML files follow a consistent pattern for loading dependencies:

1. **Core Libraries**: React, ReactDOM, jQuery
2. **Grid Components**: `react-data-grid.js`, `react-data-grid.ui-plugins.js`
3. **Build Artifacts**: `shared.js`, `examples.js` (or `index.js`)
4. **Styling**: Bootstrap, custom CSS, grid themes

Sources: [examples/index.html:19-28](), [examples/examples.html:55-61]()

## Example Organization Structure

The examples follow a modular structure where each example is self-contained and demonstrates specific grid features:

```mermaid
graph TB
    subgraph "Example Module Structure"
        SCRIPT["ExampleScripts Entry<br/>{hashLocation, module}"]
        COMPONENT["React Component<br/>Example Implementation"]
        PROPS["Grid Configuration<br/>columns, rows, handlers"]
        FEATURES["Demonstrated Features<br/>editors, formatters, etc."]
    end
    
    subgraph "Routing Integration"
        HASH["URL Hash<br/>/#/example-name"]
        ROUTE["React Router Route<br/>Route Component"]
        HANDLER["Route Handler<br/>Renders Example"]
    end
    
    subgraph "Navigation Integration"
        LINK["Navigation Link<br/>Navbar/Sidebar"]
        LIST["ExampleList Component<br/>Renders All Links"]
    end
    
    SCRIPT --> COMPONENT
    COMPONENT --> PROPS
    PROPS --> FEATURES
    
    SCRIPT --> HASH
    HASH --> ROUTE
    ROUTE --> HANDLER
    HANDLER --> COMPONENT
    
    SCRIPT --> LINK
    LINK --> LIST
    LIST --> HASH
    
    style SCRIPT fill:#fff2e8
    style COMPONENT fill:#e8f4f8
    style FEATURES fill:#f0f8e8
```

Sources: [examples/examples.js:20-23](), [examples/components/Navbar.js:29](), [examples/examples.js:34]()

## Main Application Component

The main `App` component in [examples/examples.js:9-18]() serves as the root container for all examples. It provides the basic layout structure and integrates with React Router's `RouteHandler` to display the selected example.

Key characteristics:
- Uses `RouteHandler` for dynamic content rendering
- Provides consistent page header across all examples
- Integrates with the routing system for example navigation

The application initialization occurs in [examples/examples.js:31-34](), where:
- Routes are processed and the router is started
- The main example content is rendered to `#example`
- The sidebar navigation is rendered to `#grid-examples-div`

## Development and Build Integration

The examples system integrates with the project's build system to provide both development and production capabilities:

| Build Artifact | Purpose | Contains |
|-----------------|---------|-----------|
| `build/examples.js` | Compiled example code | All example modules and routing |
| `build/shared.js` | Common utilities | Shared code between examples |
| `build/react-data-grid.js` | Core grid library | Main ReactDataGrid component |
| `build/react-data-grid.ui-plugins.js` | Plugin extensions | Editors, formatters, tools |

The build system ensures that examples have access to:
- Latest grid component builds
- All available plugins and extensions  
- Proper asset compilation and optimization
- Development tools like CodeMirror for code display

Sources: [examples/examples.html:58-61](), [examples/index.html:25-28]()
