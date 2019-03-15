import * as Editors from './editors';
import * as Formatters from './formatters';
import Toolbar from './toolbars/Toolbar';
import * as ToolsPanel from './toolbars';
import * as Data from './data';
import * as Menu from './menu';
import * as Draggable from './draggable';
import * as DraggableHeader from './draggable-header';
import * as Filters from './cells/headerCells/filters';
import { rowComparer } from 'react-data-grid';
import * as performance from './performance';
const Utils = { rowComparer, performance };

window.ReactDataGridPlugins = { Editors, Formatters, Toolbar, Menu, Data, ToolsPanel, Draggable, DraggableHeader, Filters, Utils };
export { Editors, Formatters, Toolbar, Menu, Data, ToolsPanel, Draggable, DraggableHeader, Filters, Utils };
