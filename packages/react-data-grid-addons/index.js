const Editors = require('./src/editors');
const Formatters = require('./src/formatters');
const Toolbar = require('./src/toolbars/Toolbar');
const ToolsPanel = require('./src/toolbars');
const Data = require('./src/data');
const Menu = require('./src/menu');
const Draggable = require('./src/draggable');
const Filters = require('./src/cells/headerCells/filters');
const { RowComparer: rowComparer } = require('react-data-grid');
const performance = require('./src/performance');
const Utils = { rowComparer, performance };

window.ReactDataGridPlugins = {Editors, Formatters, Toolbar, Menu, Data, ToolsPanel, Draggable, Filters, Utils};
module.exports = {Editors, Formatters, Toolbar, Menu, Data, ToolsPanel, Draggable, Filters, Utils};
