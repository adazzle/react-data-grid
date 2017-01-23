const Editors = require('./editors');
const Formatters = require('./formatters');
const Toolbar = require('./toolbars/Toolbar');
const ToolsPanel = require('./toolbars');
const Data = require('./data');
const Menu = require('./menu');
const Draggable = require('./draggable');
const Filters = require('./cells/headerCells/filters');
const { RowComparer: rowComparer } = require('react-data-grid');
const performance = require('./performance');
const Utils = { rowComparer, performance };

window.ReactDataGridPlugins = {Editors, Formatters, Toolbar, Menu, Data, ToolsPanel, Draggable, Filters, Utils};
module.exports = {Editors, Formatters, Toolbar, Menu, Data, ToolsPanel, Draggable, Filters, Utils};
