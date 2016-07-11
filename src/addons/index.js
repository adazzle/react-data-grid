const Editors = require('./editors');
const Formatters = require('./formatters');
const Toolbar = require('./toolbars/Toolbar');
const ToolsPanel = require('./toolbars');
const DataView = require('./data/DataView');
const Menu = require('./menu');

window.ReactDataGridPlugins = {Editors, Formatters, Toolbar, Menu};
export {Editors, Formatters, Toolbar, Menu, DataView, ToolsPanel};
