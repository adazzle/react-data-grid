# Examples and Demos

<details>
<summary>Relevant source files</summary>

The following files were used as context for generating this wiki page:

- [examples/assets/css/main.css](examples/assets/css/main.css)
- [examples/assets/images/datagrid1.png](examples/assets/images/datagrid1.png)
- [examples/components/Navbar.js](examples/components/Navbar.js)
- [examples/examples.html](examples/examples.html)
- [examples/examples.js](examples/examples.js)
- [examples/index.html](examples/index.html)
- [examples/scripts/example13-all-features.js](examples/scripts/example13-all-features.js)
- [examples/scripts/example14-all-features-immutable.js](examples/scripts/example14-all-features-immutable.js)
- [src/addons/cells/headerCells/FilterableHeaderCell.js](src/addons/cells/headerCells/FilterableHeaderCell.js)

</details>



This document covers the examples and demonstration system built into the react-data-grid project, including the interactive demo site, example implementations, and the infrastructure that supports them. The examples serve as both documentation and testing tools, showcasing various grid features and usage patterns.

For installation and basic setup information, see [Installation and Getting Started](#1.1). For detailed API documentation, see [API Reference](#9).

## Example System Architecture

The examples system is built as a React application with client-side routing, designed to showcase different grid configurations and features in an interactive format.

### Example Application Structure

```mermaid
graph TD
    HTML["examples.html<br/>Main Demo Page"] --> ROUTER["examples.js<br/>Route Handler"]
    INDEX["index.html<br/>Landing Page"] --> NAV["Navbar.js<br/>Navigation Component"]
    
    ROUTER --> SCRIPTS["scripts/<br/>Individual Examples"]
    ROUTER --> EXLIST["ExampleList.js<br/>Navigation Menu"]
    
    SCRIPTS --> EX13["example13-all-features.js<br/>Comprehensive Demo"]
    SCRIPTS --> EX14["example14-all-features-immutable.js<br/>Immutable.js Demo"]
    
    HTML --> DEPS["Dependencies<br/>React, Faker, Immutable"]
    HTML --> ASSETS["assets/<br/>CSS, JS, Images"]
    HTML --> BUILD["build/<br/>Compiled Grid Assets"]
    
    BUILD --> RDG["react-data-grid.js<br/>Main Grid Component"]
    BUILD --> PLUGINS["react-data-grid.ui-plugins.js<br/>Plugin System"]
```

Sources: [examples/examples.html:1-65](), [examples/examples.js:1-35](), [examples/components/Navbar.js:1-44]()

### Routing and Navigation System

The examples application uses React Router to provide navigation between different demonstration scenarios:

```mermaid
graph LR
    APP["App Component<br/>examples.js:9-18"] --> HANDLER["RouteHandler<br/>React Router"]
    
    ROUTES["Route Configuration<br/>examples.js:20-29"] --> ALLROUTES["ExampleScripts.map()<br/>Dynamic Route Generation"]
    
    EXLIST["ExampleList Component<br/>Sidebar Navigation"] --> LINKS["Example Links<br/>Hash-based Navigation"]
    
    NAVBAR["Navbar Component<br/>Top Navigation"] --> DROPDOWN["Examples Dropdown<br/>components/Navbar.js:27-30"]
```

The routing system maps example scripts to hash-based URLs, allowing direct navigation to specific demonstrations.

Sources: [examples/examples.js:20-34](), [examples/components/Navbar.js:27-30]()

## Basic Examples

### Simple Grid Implementation

Basic examples demonstrate fundamental grid functionality with minimal configuration:

| Feature | Implementation | Example File |
|---------|---------------|--------------|
| Data Display | Static row rendering | `scripts/example01-basic.js` |
| Column Definition | Basic column configuration | `scripts/example02-columns.js` |
| Cell Editing | Simple text editors | `scripts/example03-editing.js` |

### Data Generation and Management

Examples use the `faker.js` library for generating realistic test data:

```mermaid
graph TD
    FAKER["faker.js Library<br/>Realistic Data Generation"] --> FACTORY["createFakeRowObjectData()<br/>example13-all-features.js:13-31"]
    
    FACTORY --> FIELDS["Data Fields<br/>id, email, firstName, etc."]
    FACTORY --> ROWS["createRows()<br/>Batch Generation"]
    
    ROWS --> STATE["Component State<br/>this.state.rows"]
    STATE --> GRID["ReactDataGrid<br/>rowGetter prop"]
```

The data generation creates comprehensive test datasets with various field types including images, addresses, and business information.

Sources: [examples/scripts/example13-all-features.js:13-39]()

## Advanced Examples

### Comprehensive Feature Demonstration

The most complete example (`example13-all-features.js`) showcases the full capability set of the grid system:

```mermaid
graph TD
    EXAMPLE13["example13-all-features.js<br/>Comprehensive Demo"] --> EDITORS["Editor Components<br/>AutoComplete, DropDown"]
    
    EXAMPLE13 --> FORMATTERS["Formatters<br/>ImageFormatter"]
    EXAMPLE13 --> TOOLBAR["Toolbar Component<br/>Add Row Functionality"]
    EXAMPLE13 --> EVENTS["Event Handling<br/>onClick, onDoubleClick"]
    
    EDITORS --> AUTOCOMPLETE["AutoCompleteEditor<br/>counties options"]
    EDITORS --> DROPDOWN["DropDownEditor<br/>titles options"]
    
    FORMATTERS --> IMAGES["Image Display<br/>Avatar Column"]
    
    TOOLBAR --> ADDROW["handleAddRow()<br/>Dynamic Row Addition"]
    
    EVENTS --> CELLOPEN["openCellEditor()<br/>Programmatic Editing"]
```

This example demonstrates advanced plugin integration, custom editors, and complex event handling patterns.

Sources: [examples/scripts/example13-all-features.js:75-254]()

### Immutable.js Integration

The `example14-all-features-immutable.js` demonstrates integration with Immutable.js for state management:

```mermaid
graph TD
    IMMUTABLE["Immutable.js Integration<br/>example14-all-features-immutable.js"] --> STATE["Immutable State<br/>Immutable.fromJS(fakeRows)"]
    
    STATE --> COLUMNS["Immutable.List<br/>Column Definitions"]
    STATE --> ROWS["Immutable Collection<br/>Row Data"]
    
    UPDATES["Update Handlers"] --> MERGE["Immutable.merge<br/>Row Updates"]
    UPDATES --> SET["Immutable.set<br/>Cell Updates"]
    
    MERGE --> ROWUPDATE["handleRowUpdated<br/>lines 167-173"]
    SET --> CELLDRAG["handleCellDrag<br/>lines 175-184"]
    SET --> COPYPASTE["handleCellCopyPaste<br/>lines 186-191"]
```

This pattern shows how to integrate the grid with immutable data structures for better performance and predictable state updates.

Sources: [examples/scripts/example14-all-features-immutable.js:160-234]()

## Demo Infrastructure

### Build System Integration

The examples are integrated with the project's build system to ensure they use the latest compiled grid components:

```mermaid
graph LR
    SRC["src/<br/>Source Components"] --> BUILD["build/<br/>Compiled Assets"]
    
    BUILD --> RDG_JS["react-data-grid.js<br/>Main Component"]
    BUILD --> PLUGINS_JS["react-data-grid.ui-plugins.js<br/>Plugin System"]
    BUILD --> CSS["react-data-grid.css<br/>Styling"]
    
    HTML["examples.html"] --> RDG_JS
    HTML --> PLUGINS_JS
    HTML --> CSS
    
    SHARED["shared.js<br/>Common Dependencies"] --> EXAMPLES_JS["examples.js<br/>Example Scripts"]
```

The build system ensures examples always use the current version of grid components during development.

Sources: [examples/examples.html:58-61](), [examples/index.html:25-27]()

### Styling and Assets

Examples include comprehensive styling and asset management:

| Asset Type | Location | Purpose |
|------------|----------|---------|
| CSS Frameworks | `assets/css/bootstrap.min.css` | Layout and components |
| Custom Styles | `assets/css/main.css` | Demo-specific styling |
| Grid Styles | `build/react-data-grid.css` | Component styling |
| JavaScript Libraries | `assets/js/` | Supporting functionality |

The styling system provides a professional appearance while highlighting grid functionality.

Sources: [examples/examples.html:23-28](), [examples/assets/css/main.css:1-570]()

### Interactive Playground

Examples use `ReactPlayground` component for live code editing and execution:

```mermaid
graph TD
    PLAYGROUND["ReactPlayground Component<br/>Interactive Code Editor"] --> CODETEXT["codeText Prop<br/>Example Source Code"]
    
    CODETEXT --> CODEMIRROR["CodeMirror Integration<br/>Syntax Highlighting"]
    CODETEXT --> EXECUTION["Live Execution<br/>Real-time Updates"]
    
    EXAMPLE13["AllFeaturesExample String<br/>example13-all-features.js:5-255"] --> PLAYGROUND
    
    PLAYGROUND --> PREVIEW["Live Preview<br/>Rendered Grid"]
```

This system allows users to modify example code and see results immediately, enhancing the learning experience.

Sources: [examples/scripts/example13-all-features.js:266](), [examples/examples.html:17-18]()
