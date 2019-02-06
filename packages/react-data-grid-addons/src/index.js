const window = require('global/window');
import Editors from './editors';
import Formatters from './formatters';
import Toolbar from './toolbars/Toolbar';
import ToolsPanel from './toolbars';
import Data from './data';
import Menu from './menu';
import Draggable from './draggable';
import DraggableHeader from './draggable-header';
import Filters from './cells/headerCells/filters';
import rowComparer from 'common/utils/RowComparer';
import performance from './performance';
const Utils = {
    rowComparer,
    performance
};

window.ReactDataGridPlugins = {
    Editors,
    Formatters,
    Toolbar,
    Menu,
    Data,
    ToolsPanel,
    Draggable,
    DraggableHeader,
    Filters,
    Utils
};
export {
    Editors,
    Formatters,
    Toolbar,
    Menu,
    Data,
    ToolsPanel,
    Draggable,
    DraggableHeader,
    Filters,
    Utils
};
