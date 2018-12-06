---
id: addons
title: React Data Grid Addons
---

## Mono respository structure
ReactDataGrid is intended to be a lightweight grid capable of rendering large amounts of data.
It is also meant to be fully extendable and customizable. Rather than have these customization options available as a single npm package, many customization options for the grid are available as separate npm packages. This allows the consumer of the grid to opt in to specific features, and only output the necessary scripts into their application. To achieve this, the respository is structured as a mono repository using [Lerna](https://lernajs.io/). 

## Installing react-data-grid-addons package
Currently the main addons package is available in npm as react-data-grid-addons. This package contains many components such as rich cell editors, a context menu, drag and drop functionality, row grouping etc. Future work will see these features all moved to their own separate npm packages, in order to allow users to opt in to the features they need and keep applications more lightweight.  

```sh
$ npm install react-data-grid-addons --save
# or with yarn:
$ yarn add react-data-grid-addons
```