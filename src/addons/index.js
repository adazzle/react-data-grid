const Editors = require('./editors');
const Formatters = require('./formatters');
const Toolbar = require('./toolbars/Toolbar');
const Menu = require('./menu');

window.ReactDataGridPlugins = {Editors, Formatters, Toolbar, Menu};
export default {Editors, Formatters, Toolbar, Menu};
