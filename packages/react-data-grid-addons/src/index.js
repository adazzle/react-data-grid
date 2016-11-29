const Editors = require('./editors');
const Formatters = require('./formatters');
const Toolbar = require('./toolbars/Toolbar');
const ToolsPanel = require('./toolbars');
const Data = require('./data/');
const Menu = require('./menu');
import Draggable from './draggable';
const Filters = require('./cells/headerCells/filters');
import rowComparer from '../RowComparer';
const Utils = {rowComparer};

window.ReactDataGridPlugins = {Editors, Formatters, Toolbar, Menu, Data, ToolsPanel, Draggable, Filters, Utils};
export {Editors, Formatters, Toolbar, Menu, Data, ToolsPanel, Draggable, Filters, Utils};
