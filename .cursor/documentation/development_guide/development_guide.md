# Development Guide

<details>
<summary>Relevant source files</summary>

The following files were used as context for generating this wiki page:

- [.babelrc](.babelrc)
- [appveyor.yml](appveyor.yml)
- [ci/publish/decrypt-npmrc.ps1](ci/publish/decrypt-npmrc.ps1)
- [ci/publish/getCurrentVersion.js](ci/publish/getCurrentVersion.js)
- [ci/publish/getNextVersion.js](ci/publish/getNextVersion.js)
- [ci/publish/publishBranch.ps1](ci/publish/publishBranch.ps1)
- [ci/publish/publishMaster.ps1](ci/publish/publishMaster.ps1)
- [config/karma.js](config/karma.js)
- [package.json](package.json)

</details>



This document provides essential information for contributors and developers working on the react-data-grid codebase. It covers the development environment setup, build processes, testing infrastructure, and contribution workflows. This guide focuses on the technical infrastructure required to develop, test, and release the react-data-grid component.

For detailed information about specific development processes, see [Build System](#8.1), [Testing](#8.2), and [CI/CD Pipeline](#8.3).

## Prerequisites and Setup

The react-data-grid project requires Node.js 4+ and uses npm for package management. The development environment relies on several key technologies:

| Technology | Purpose | Configuration |
|------------|---------|---------------|
| Node.js 4+ | Runtime environment | Required for all build processes |
| npm 3+ | Package management | Specified in AppVeyor configuration |
| Gulp | Task automation | Global installation required |
| Babel | ES6/JSX transpilation | Configured via `.babelrc` |
| Webpack | Module bundling | Used by both build and test systems |
| Karma + Jasmine | Test execution | Configured in `config/karma.js` |

The project uses React 0.14.6 as a peer dependency, indicating compatibility requirements for the development environment.

**Development Environment Diagram**

```mermaid
graph TB
    subgraph "Local Development"
        NODE["Node.js 4+"]
        NPM["npm 3+"]
        GULP_GLOBAL["gulp (global)"]
        REPO["Local Repository"]
    end
    
    subgraph "Build Tools"
        BABEL[".babelrc<br/>ES6/JSX Transform"]
        WEBPACK["webpack.common.js<br/>Module Bundling"]
        KARMA["config/karma.js<br/>Test Runner"]
        ESLINT["ESLint Config<br/>Code Linting"]
    end
    
    subgraph "Package Dependencies"
        PACKAGE["package.json"]
        DEPS["dependencies"]
        DEV_DEPS["devDependencies"]
        PEER_DEPS["peerDependencies"]
    end
    
    NODE --> NPM
    NPM --> GULP_GLOBAL
    NPM --> PACKAGE
    PACKAGE --> DEPS
    PACKAGE --> DEV_DEPS  
    PACKAGE --> PEER_DEPS
    
    GULP_GLOBAL --> BABEL
    GULP_GLOBAL --> WEBPACK
    GULP_GLOBAL --> KARMA
    GULP_GLOBAL --> ESLINT
    
    REPO --> PACKAGE
    BABEL --> WEBPACK
    WEBPACK --> KARMA
```

Sources: [package.json:1-120](), [appveyor.yml:28-36](), [.babelrc:1-9](), [config/karma.js:1-191]()

## Development Workflow

The development workflow centers around npm scripts defined in `package.json` and Gulp tasks for build automation. The primary development commands are:

- `npm run examples` - Starts local development server with examples
- `npm test` - Runs the complete test suite
- `npm run debug-test` - Runs tests in debug mode with Chrome
- `npm run prepublish` - Builds distribution files for release

**Development Command Flow**

```mermaid
graph LR
    subgraph "npm Scripts"
        EXAMPLES["npm run examples"]
        TEST["npm test"]
        DEBUG["npm run debug-test"]
        PREPUB["npm run prepublish"]
    end
    
    subgraph "Gulp Tasks"
        GULP_DEFAULT["gulp (default)"]
        GULP_TEST["gulp test"]
        GULP_DEBUG["gulp test --debug"]
        GULP_DIST["gulp dist --release"]
    end
    
    subgraph "Build Outputs"
        DEV_SERVER["Development Server<br/>with Examples"]
        TEST_RESULTS["Test Results<br/>Coverage Reports"]
        DEBUG_CHROME["Chrome Debug Session"]
        DIST_FILES["Distribution Files<br/>dist/ directory"]
    end
    
    EXAMPLES --> GULP_DEFAULT
    TEST --> GULP_TEST
    DEBUG --> GULP_DEBUG
    PREPUB --> GULP_DIST
    
    GULP_DEFAULT --> DEV_SERVER
    GULP_TEST --> TEST_RESULTS
    GULP_DEBUG --> DEBUG_CHROME
    GULP_DIST --> DIST_FILES
```

Sources: [package.json:6-11]()

## Build System Architecture

The build system uses Gulp as the primary task runner, orchestrating Babel for transpilation, Webpack for module bundling, and various other tools for optimization and packaging. The system supports both development and production builds with different optimization levels.

Key build configurations:
- **Babel**: Transpiles ES6/JSX using `es2015-loose` and `react` presets
- **Webpack**: Handles module resolution and bundling
- **ESLint**: Enforces code quality standards
- **Less**: Compiles stylesheets from the themes directory

**Build Pipeline Architecture**

```mermaid
graph TB
    subgraph "Source Files"
        SRC_JS["src/**/*.js<br/>src/**/*.jsx"]
        THEMES["themes/**/*.less"]  
        EXAMPLES_SRC["examples/**/*"]
    end
    
    subgraph "Build Processing"
        BABEL_TRANSFORM["Babel Transform<br/>.babelrc config"]
        WEBPACK_BUNDLE["Webpack Bundling<br/>webpack.common.js"]
        LESS_COMPILE["Less Compilation"]
        ESLINT_CHECK["ESLint Validation"]
    end
    
    subgraph "Output Targets"
        DIST_DIR["dist/<br/>Distribution Files"]
        EXAMPLES_BUILD["examples/build/<br/>Demo Assets"] 
        TEST_COVERAGE["test/coverage/<br/>Coverage Reports"]
    end
    
    SRC_JS --> ESLINT_CHECK
    SRC_JS --> BABEL_TRANSFORM
    THEMES --> LESS_COMPILE
    EXAMPLES_SRC --> WEBPACK_BUNDLE
    
    BABEL_TRANSFORM --> WEBPACK_BUNDLE
    WEBPACK_BUNDLE --> DIST_DIR
    WEBPACK_BUNDLE --> EXAMPLES_BUILD
    LESS_COMPILE --> DIST_DIR
    
    WEBPACK_BUNDLE --> TEST_COVERAGE
```

Sources: [.babelrc:1-9](), [package.json:38-112]()

## Testing Infrastructure

The testing system uses Karma as the test runner with Jasmine as the testing framework. The configuration supports multiple browsers and generates comprehensive coverage reports using Istanbul.

Testing capabilities include:
- **Unit Tests**: Isolated component testing
- **Integration Tests**: Full system testing  
- **Cross-browser Testing**: Chrome, Firefox, IE support
- **Coverage Reporting**: HTML and LCOV formats
- **Debug Mode**: Chrome debugging with source maps

**Testing System Architecture**  

```mermaid
graph TB
    subgraph "Test Configuration"
        KARMA_CONFIG["config/karma.js<br/>Test Runner Config"]
        TEST_FILES["test/unitTests.jsx<br/>test/FullTests.jsx"]
        WEBPACK_TEST["Webpack Test Config<br/>with source maps"]
    end
    
    subgraph "Test Execution"
        PHANTOMJS["PhantomJS<br/>(default)"]
        CHROME["Chrome<br/>(debug mode)"]
        FIREFOX["Firefox<br/>(release)"]
        IE["Internet Explorer<br/>(release)"]
    end
    
    subgraph "Test Reporting"
        JUNIT["JUnit Reporter<br/>test-results.xml"]
        COVERAGE["Coverage Reporter<br/>HTML + LCOV"]
        PROGRESS["Progress Reporter<br/>Console output"]
    end
    
    KARMA_CONFIG --> TEST_FILES
    KARMA_CONFIG --> WEBPACK_TEST
    
    TEST_FILES --> PHANTOMJS
    TEST_FILES --> CHROME
    TEST_FILES --> FIREFOX  
    TEST_FILES --> IE
    
    PHANTOMJS --> JUNIT
    CHROME --> JUNIT
    FIREFOX --> JUNIT
    IE --> JUNIT
    
    JUNIT --> COVERAGE
    COVERAGE --> PROGRESS
```

Sources: [config/karma.js:14-190]()

## CI/CD Pipeline  

The project uses AppVeyor for continuous integration on Windows, with automated testing, building, and publishing workflows. The pipeline handles different behaviors based on branch and build type.

CI/CD features:
- **Multi-browser Testing**: Chrome, Firefox, IE across different versions
- **Coverage Reporting**: Automated coverage uploads to Coveralls
- **Automated Publishing**: NPM package releases for master and feature branches
- **Documentation Generation**: Automatic docs regeneration on master

**CI/CD Workflow**

```mermaid
graph TB
    subgraph "Build Triggers"
        MASTER_PUSH["Push to Master"]
        BRANCH_PUSH["Push to Feature Branch"] 
        PR_BUILD["Pull Request Build"]
        SCHEDULED["Scheduled Build"]
    end
    
    subgraph "AppVeyor Pipeline"
        INSTALL["install:<br/>Node 4, npm 3, gulp"]
        BUILD_STEPS["Build Steps:<br/>gulp flow, dist, examples"]
        TEST_RUN["test_script:<br/>gulp test --release"]
        COVERAGE_UPLOAD["Coverage Upload<br/>uploadResults.ps1"]
    end
    
    subgraph "Publishing Logic"
        MASTER_PUB["publishMaster.ps1<br/>Version bump + npm publish"]
        BRANCH_PUB["publishBranch.ps1<br/>Tagged npm publish"]
        DOCS_GEN["Documentation<br/>Regeneration"]
    end
    
    MASTER_PUSH --> INSTALL
    BRANCH_PUSH --> INSTALL
    PR_BUILD --> INSTALL
    SCHEDULED --> INSTALL
    
    INSTALL --> BUILD_STEPS
    BUILD_STEPS --> TEST_RUN
    TEST_RUN --> COVERAGE_UPLOAD
    
    COVERAGE_UPLOAD --> MASTER_PUB
    COVERAGE_UPLOAD --> BRANCH_PUB
    MASTER_PUB --> DOCS_GEN
```

Sources: [appveyor.yml:1-65](), [ci/publish/publishMaster.ps1:1-29](), [ci/publish/publishBranch.ps1:1-16]()

## Development Dependencies

The project maintains a comprehensive set of development dependencies for building, testing, and quality assurance:

| Category | Key Dependencies | Purpose |
|----------|-----------------|---------|
| **Build Tools** | `babel-core`, `webpack`, `gulp` | Core build infrastructure |
| **Testing** | `karma`, `jasmine-core`, `enzyme` | Test execution and utilities |
| **Code Quality** | `eslint`, `babel-eslint` | Linting and code standards |
| **Browser Support** | `karma-chrome-launcher`, `karma-firefox-launcher`, `karma-ie-launcher` | Cross-browser testing |
| **Coverage** | `karma-coverage`, `istanbul-instrumenter-loader` | Code coverage analysis |
| **Utilities** | `lodash`, `minimist`, `semver` | General utilities and helpers |

The production dependencies are minimal, focusing on React ecosystem components and essential utilities like `classnames` and `object-assign`.

Sources: [package.json:25-112]()
