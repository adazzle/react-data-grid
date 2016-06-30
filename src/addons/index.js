const Editors = require('./editors');
const Formatters = require('./formatters');
const Toolbar = require('./toolbars/Toolbar');
const Menu = require('./menu');
const CustomFilters = require('./cells/headerCells/filters');

window.ReactDataGridPlugins = {Editors, Formatters, Toolbar, Menu, CustomFilters};
export {Editors, Formatters, Toolbar, Menu, CustomFilters};
