---
title: ReactDataGrid v6.0 
author: Aman Mahajan
authorURL: https://github.com/amanmahajan7
authorImageURL: https://avatars1.githubusercontent.com/u/1452717?s=400&u=91ec7f696d17d8d4cd04a71cbcd7e4d3b0a2de8a&v=4
---

Today we are happy to announce the release of ReactDataGrid v6.0. With this release we are dropping support for React 15. For the longest time ReactDataGrid has provided support for React 15 but this has made difficult to fix some of the common bugs and prevented us from using the new features introduced in React v16. Other changes include

## New Public Website
If you have not seen it then please check out our new [website](http://adazzle.github.io/react-data-grid/). We added various guides, documentated props, added interactive examples and much more.

## Fix Editor Rendering
EditorContainer now uses [Portals](https://reactjs.org/docs/portals.html) to render the editors outside the grid component. Previously the editor was rendered inside the grid component and this had caused a myriad of bugs like [this](https://github.com/adazzle/react-data-grid/issues/1271) where editor is not visible on the last row. 

## Upgraded Build Tools
ReactDataGrid is now bundled using Babel7 and webpack 4 and all the other build tools have also been upgraded.

## Other Code Improvements
Please check the [change log](https://adazzle.github.io/react-data-grid/docs/changelog) for more details.
