// Type definitions for react-data-grid 5.0.5
// Project: https://github.com/adazzle/react-data-grid.git
declare namespace AdazzleReactDataGridPlugins {
  // TODO: refine types for these addons
  export namespace Editors {
    export class AutoComplete extends React.Component<any, {}> { }
    export class DropDownEditor extends React.Component<any, {}> { }
    export class SimpleTextEditor extends React.Component<any, {}> { }
    export class CheckboxEditor extends React.Component<any, {}> { }
  }
  export namespace Formatters {
    export class ImageFormatter extends React.Component<any, {}> { }
    export class DropDownFormatter extends React.Component<any, {}> { }
  }
  export class Toolbar extends React.Component<any, any> { }
  // https://github.com/vkbansal/react-contextmenu/blob/master/src/index.d.ts
  export namespace Menu {
    interface ContextMenuProps {
      id: string,
      data?: any,
      className?: string,
      hideOnLeave?: boolean,
      onHide?: {(event: any): void},
      onMouseLeave?: {(event: React.MouseEvent<HTMLElement>, data: Object, target: HTMLElement): void} | Function,
      onShow?: {(event: any): void},
    }

    interface ContextMenuTriggerProps {
      id: string,
      attributes?: React.HTMLAttributes<any>,
      collect?: {(data: any): any},
      disable?: boolean,
      holdToDisplay?: number,
      renderTag?: React.ReactType,
    }

    interface MenuItemProps {
      attributes?: React.HTMLAttributes<HTMLDivElement>,
      data?: Object,
      disabled?: boolean,
      divider?: boolean,
      preventClose?: boolean,
      onClick?: {(event: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>, data: Object, target: HTMLElement): void} | Function,
    }

    interface SubMenuProps {
      title: React.ReactElement<any>,
      className?: string,
      disabled?: boolean,
      hoverDelay?: number,
      rtl?: boolean,
    }

    export const ContextMenu: React.ComponentClass<ContextMenuProps>;
    export const ContextMenuTrigger: React.ComponentClass<ContextMenuTriggerProps>;
    export const MenuItem: React.ComponentClass<MenuItemProps>;
    export const SubMenu: React.ComponentClass<SubMenuProps>;
  }

  export namespace Filters {
    export class AutoCompleteFilter extends React.Component<any, {}>{ }
    export class NumericFilter extends React.Component<any, {}>{ }
    export class SingleSelectFilter extends React.Component<any, {}>{ }
  }

  export namespace Draggable {
    export class Container extends React.Component<any, {}>{ }
  }

  export namespace DraggableHeader {
    export class DraggableContainer extends React.Component<any, {}>{ }
  }

  export namespace ToolsPanel {
    export class GroupedColumnsPanel extends React.Component<any, any> { }
    export class GroupedColumnButton extends React.Component<AdazzleReactDataGrid.ColumnGroupButtonProps, any> { }
  }

  export namespace Data {
    export const Selectors: {
      getRows: ({ rows, groupBy, expandedRows }: AdazzleReactDataGrid.GroupedGridState) => object[]
      getSelectedRowsByKey: (rowKey: string, selectedKeys: string[], rows: any) => string[]
    }
  }
}

declare module "react-data-grid-addons" {
  import Plugins = AdazzleReactDataGridPlugins;
  import Editors = Plugins.Editors;
  import Formatters = Plugins.Formatters;
  import Toolbar = Plugins.Toolbar;
  import Menu = Plugins.Menu;
  import Filters = Plugins.Filters;
  import Draggable = Plugins.Draggable;
  import DraggableHeader = Plugins.DraggableHeader;
  import ToolsPanel = Plugins.ToolsPanel;
  import Data = Plugins.Data;

  // ES6 named exports
  export {
    Editors,
    Formatters,
    Toolbar,
    Menu,
    Filters,
    Draggable,
    DraggableHeader,
    ToolsPanel,
    Data,
  }

  // attach to window
  interface Window {
    ReactDataGridPlugins: {
      Editors: typeof Editors
      Formatters: typeof Formatters
      Toolbar: typeof Toolbar
      Menu: typeof Menu
      Draggable: typeof Draggable
      ToolsPanel: typeof ToolsPanel
      Data: typeof Data
    }
  }
}
