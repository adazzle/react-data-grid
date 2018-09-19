const Editors = require('./editors');
const Formatters = require('./formatters');
const Toolbar = require('./toolbars/Toolbar');
const ToolsPanel = require('./toolbars');
const Data = require('./data');
const Menu = require('./menu');
const Draggable = require('./draggable');
const DraggableHeader = require('./draggable-header');
const Filters = require('./cells/headerCells/filters');
import rowComparer from 'common/utils/RowComparer';
const performance = require('./performance');
const Utils = { rowComparer, performance };

window.ReactDataGridPlugins = {Editors, Formatters, Toolbar, Menu, Data, ToolsPanel, Draggable, DraggableHeader, Filters, Utils};
module.exports = {Editors, Formatters, Toolbar, Menu, Data, ToolsPanel, Draggable, DraggableHeader, Filters, Utils};
