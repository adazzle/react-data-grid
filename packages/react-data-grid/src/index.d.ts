// Type definitions for react-data-grid 5.0.5
// Project: https://github.com/adazzle/react-data-grid.git
declare namespace AdazzleReactDataGrid {
  interface KeyValueAny {
    [key: string]: any;
  }

  interface SelectionParams<R extends {} = KeyValueAny> {
    rowIdx: number;
    row: R;
  }

  interface MetaBase<C extends {} = KeyValueAny, R extends {} = KeyValueAny> {
    column: Column<C>;
    row: R;
  }

  interface PositionMeta {
    idx: number;
    rowIdx: number;
  }

  type EditableMeta<C extends {} = KeyValueAny, R extends {} = KeyValueAny> = MetaBase<C, R> & PositionMeta;

  type ExpandMeta<R extends {} = KeyValueAny> = PositionMeta & {
    rowData: R;
    expandArgs: {
      canExpand: boolean;
      children: R[];
      expanded: boolean | undefined;
      field: string;
      subRowDetails: SubRowDetails<R>;
      treeDepth: number;
    };
  };

  interface SubRowDetails<R extends {} = KeyValueAny> {
    children?: R[];
    expanded?: boolean;
    field?: string;
    group?: boolean;
    numberSiblings?: number;
    siblingIndex?: number;
    treeDepth?: number;
  }

  interface RowGroupExpandEventProps {
    columnGroupName: string;
    name: string;
    shouldExpand: boolean;
  }

  interface CellContent {
    value: any;
    column: Column;
    rowIdx: number;
    isExpanded: boolean;
  }

  type editableCellFn<R extends {} = KeyValueAny> = (rowData: R) => boolean;

  interface ColumnEventArgs {
    rowIdx: number;
    idx: number;
    name: string;
    rowId: number;
  }

  interface ColumnEventCallback {
    /**
     * A callback for a native react event on a specific cell.
     * @param ev The react event
     * @param args The row and column coordinates of the cell, and the name of the event.
     */
    (ev: React.SyntheticEvent<any>, args: ColumnEventArgs): void;
  }

  interface GridProps<CustomColFields extends {} = KeyValueAny, RowData extends {} = KeyValueAny> {
    /**
     * Gets the data to render in each row. Required.
     * Can be an array or a function that takes an index and returns an object.
     */
    rowGetter: Array<RowData> | ((rowIdx: number) => RowData);
    /**
     * The total number of rows to render. Required.
     */
    rowsCount: number;
    /**
     * The columns to render.
     */
    columns?: Array<Column<CustomColFields>>;
    /**
     * Deprecated: Invoked when the user changes the value of a single cell.
     * Should update that cell's value.
     * @param e Information about the event
     */
    onRowUpdated?: (e: RowUpdateEvent) => void;
    /**
     * Deprecated: Invoked when the user pulls down the drag handle of an editable cell.
     * Should update the values of the selected cells.
     * @param e Information about the event
     */
    onCellsDragged?: (e: CellDragEvent) => void;
    /**
     * Deprecated: Invoked when the user double clicks on the drag handle of an editable cell.
     * Should update the values of the cells beneath the selected cell.
     * @param e Information about the event
     */
    onDragHandleDoubleClick?: (e: DragHandleDoubleClickEvent<RowData>) => void;
    /**
     * Deprecated: Invoked when the user copies a value from one cell and pastes it into another (in the same column).
     * Should update the value of the cell in row e.toRow.
     * @param e Information about the event
     */
    onCellCopyPaste?: (e: CellCopyPasteEvent) => void;
    /**
     * Invoked after the user updates the grid rows in any way.
     * @param e Information about the event
     */
    onGridRowsUpdated?: (e: GridRowsUpdatedEvent<RowData>) => void;
    /**
     * Invoked after the cell is double clicked or receive any keyboard inputs.
     */
    onCheckCellIsEditable?: (editableMeta: EditableMeta<CustomColFields, RowData>) => boolean;
    /**
     * A toolbar to display above the grid.
     * Consider using the toolbar included in "react-data-grid-addons".
     */
    toolbar?: React.ReactElement<any>;
    /**
     * A context menu to disiplay when the user right-clicks a cell.
     * Consider using "react-contextmenu", included in "react-data-grid-addons".
     */
    contextMenu?: React.ReactElement<any>;
    /**
     * A react component to customize how rows are rendered.
     * If you want to define your own, consider extending ReactDataGrid.RowData.
     * TODO: add base props definition so that the customized component knows what's the reserved props fields
     */
    rowRenderer?: React.ReactElement<any> | React.ComponentClass<any> | React.StatelessComponent<any>;
    /**
     * A react component to customize how rows are rendered with grouping enabled.
     * If you want to define your own, consider extending ReactDataGrid.RowData.
     * TODO: add base props definition so that the customized component knows what's the reserved props fields
     */
    rowGroupRenderer?: React.ComponentClass<any> | React.StatelessComponent<any>;
    /**
     * A component to display when there are no rows to render.
     */
    emptyRowsView?: React.ComponentClass<any> | React.StatelessComponent<any>;
    /**
     * The minimum width of the entire grid in pixels.
     */
    minWidth?: number;
    /**
     * The minimum height of the entire grid in pixels.
     * @default 350
     */
    minHeight?: number;
    /**
     * The height of each individual row in pixels.
     * @default 35
     */
    rowHeight?: number;
    /**
     * The height of the header row in pixels.
     * @default rowHeight
     */
    headerRowHeight?: number;
    /**
     * The minimum width of each column in pixels.
     * @default 80
     */
    minColumnWidth?: number;
    /**
     * Invoked when a column has been resized.
     * @param index The index of the column
     * @param width The new width of the column
     */
    onColumnResize?: (index: number, width: number) => void;
    /**
     * Controls what happens when the user navigates beyond the first or last cells.
     * 'loopOverRow' will navigate to the beginning/end of the current row.
     * 'changeRow' will navigate to the beginning of the next row or the end of the last.
     * 'none' will do nothing.
     * @default none
     */
    cellNavigationMode?: 'none' | 'loopOverRow' | 'changeRow';
    /**
     * Called when the user sorts the grid by some column.
     * Should update the order of the rows returned by rowGetter.
     * @param sortColumn The name of the column being sorted by
     * @param sortDirection The direction to sort ('ASC'/'DESC'/'NONE')
     */
    onGridSort?: (sortColumn: string, sortDirection: 'ASC' | 'DESC' | 'NONE') => void;
    /**
     * Called when the user filters a column by some value.
     * Should restrict the rows in rowGetter to only things that match the filter.
     * @param filter The filter being added
     */
    onAddFilter?: (filter: Filter) => void;
    /**
     * Called when the user clears all filters.
     * Should restore the rows in rowGetter to their original state.
     */
    onClearFilters?: () => void;
    /**
     * Deprecated:
     * When set to true or 'multi', enables multiple row select.
     * When set to 'single', enables single row select.
     * When set to false or not set, disables row select.
     * @default false
     */
    enableRowSelect?: boolean | 'single' | 'multi';
    /**
     * Called when a row is selected.
     * @param rows The (complete) current selection of rows.
     */
    onRowSelect?: (rows: Array<RowData>) => void;
    /**
     * A property that's unique to every row.
     * This property is required to enable row selection.
     * for example, if rowKey = uniqId, then the row.uniqId will hold this uniq id for each row
     * @default 'id'
     */
    rowKey?: string;
    /**
     * Enables cells to be selected when clicked.
     * @default false
     */
    enableCellSelect?: boolean;
    /**
    * Enables drag and drop functionality.
    * @default false
    */
    enableDragAndDrop?: boolean;
    /**
     * Called when a cell is selected.
     * @param coordinates The row and column indices of the selected cell.
     */
    onCellSelected?: (coordinates: PositionMeta) => void;
    /**
     * Called when a cell is deselected.
     * @param coordinates The row and column indices of the deselected cell.
     */
    onCellDeSelected?: (coordinates: PositionMeta) => void;
    /**
     * Called when a row group isexpanded / collapsed.
     * @param RowGroupExpandEventProps key Name, display name, function to validate whether row should be expanded.
     */
    onRowExpandToggle?: ({ columnGroupName, name, shouldExpand }: RowGroupExpandEventProps) => void;
    /**
     * How long to wait before rendering a new row while scrolling in milliseconds.
     * @default 0
     */
    rowScrollTimeout?: number
    /**
     * Options object for selecting rows
     */
    rowSelection?: {
      showCheckbox?: boolean;
      enableShiftSelect?: boolean;
      onRowsSelected?: (rows: Array<SelectionParams<RowData>>) => void;
      onRowsDeselected?: (rows: Array<SelectionParams<RowData>>) => void;
      selectBy?: {
        indexes?: Array<number>;
        keys?: {
          rowKey: string;
          values: Array<any>
        };
        isSelectedKey?: string;
      };
    };
    /**
     * Filter rows
     */
    getValidFilterValues?: (key: string) => Array<any>;
    /**
     * onRowClick
     */
    onRowClick?: (rowIdx: number, row: RowData, column: Column<CustomColFields>) => void;
    /**
     * Select All Renderer
     * TODO: add base props definition so that the customized component knows what's the reserved props fields
     */
    selectAllRenderer?: React.ReactElement<any> | React.ComponentClass<any> | React.StatelessComponent<any>;
    /**
     * RowData Actions Cell
     * TODO: add base props definition so that the customized component knows what's the reserved props fields
     */
    rowActionsCell?: React.ReactElement<any> | React.ComponentClass<any> | React.StatelessComponent<any>;
    /**
     * Return subrowdetail for the current row.
     */
    getSubRowDetails?: (row: RowData) => SubRowDetails<RowData>;
    /**
     * Invoked when the cell expand icon is clicked
     */
    onCellExpand?: (expandMeta: ExpandMeta<RowData>) => void;
    /**
     * Toggles whether cells should be autofocused
     */
    enableCellAutoFocus?: boolean;
  }

  /**
   * Information about a specific column to be rendered.
   */
  interface ColumnBase<RowData extends {} = KeyValueAny> {
    /**
     * A unique key for this column. Required.
     * Each row should have a property with this name, which contains this column's value.
     */
    key: string;
    /**
     * This column's display name. Required.
     */
    name: string;
    /**
     * A custom width for this specific column.
     * @default minColumnWidth from the ReactDataGrid
     */
    width?: number;
    /**
     * Whether this column can be resized by the user.
     * @default false
     */
    resizable?: boolean;
    /**
     * Whether this column should stay fixed on the left as the user scrolls horizontally.
     * @default false
     */
    locked?: boolean;
    /**
     * Whether this column can be edited.
     * @default false
     */
    editable?: boolean | editableCellFn<RowData>;
    /**
     * Whether the rows in the grid can be sorted by this column.
     * @default false
     */
    sortable?: boolean;
    /**
     * Whether the rows in the grid can be filtered by this column.
     * @default false
     */
    filterable?: boolean;
    /**
     * The editor for this column. Several editors are available in "react-data-grid-addons".
     * TODO: should we consider adding the preserved props definition?
     * e.g
     * React.ComponentClass<ColumnExtra, P extends {
     *   value: any;
     *   column: Column<ColumnExtra>;
     *   ...
     * }>
     * @default A simple text editor
     */
    editor?: React.ReactElement<any> | React.ComponentClass<any> | React.StatelessComponent<any>;
    /**
     * A custom read-only formatter for this column. An image formatter is available in "react-data-grid-addons".
     * TODO: should we consider adding the preserved props definition?
     */
    formatter?: React.ReactElement<any> | React.ComponentClass<any> | React.StatelessComponent<any>;
    /**
     * A custom formatter for this column's header.
     */
    headerRenderer?: React.ReactElement<any> | React.ComponentClass<any> | React.StatelessComponent<any>;
    /**
     * Events to be bound to the cells in this specific column.
     * Each event must respect this standard in order to work correctly:
     * @example
     * function onXxx(ev :SyntheticEvent, (rowIdx, idx, name): args)
     */
    filterRenderer?: React.ReactElement<any> | React.ComponentClass<any> | React.StatelessComponent<any>;
    /**
     * Will be deprecated
     * Use rowMetaData directly inside the row object.
     * Called when the cell is rendered to provide a list of related informations for a formater.
     */
    getRowMetaData?(rowData: RowData, column: Column): any;

    events?: {
      [name: string]: ColumnEventCallback;
    };
    /**
     * Like React attribute className, the general classNames being put for all the cells under the current column
     */
    cellClass?: string;
    /**
     * Whether the current columns can be dragged, this is required to be used with DraggableHeader
     */
    draggable?: boolean;
  }

  type Column<T extends {} = KeyValueAny> = ColumnBase & T;

  /**
   * Information about a row update
   */
  interface RowUpdateEvent<T = any> {
    /**
     * The index of the updated row.
     */
    rowIdx: number;
    /**
     * The columns that were updated and their values.
     */
    updated: T;
    /**
     * The name of the column that was updated.
     */
    cellKey: string;
    /**
     * The name of the key pressed to trigger the event ('Tab', 'Enter', etc.).
     */
    key: string;
  }

  /**
   * Information about a cell drag
   */
  interface CellDragEvent {
    /**
     * The name of the column that was dragged.
     */
    cellKey: string;
    /**
     * The row where the drag began.
     */
    fromRow: number;
    /**
     * The row where the drag ended.
     */
    toRow: number;
    /**
     * The value of the cell that was dragged.
     */
    value: any;
  }

  /**
   * Information about a drag handle double click
   */
  interface DragHandleDoubleClickEvent<T extends {} = KeyValueAny> {
    /**
     * The row where the double click occurred.
     */
    rowIdx: number;
    /**
     * The column where the double click occurred.
     */
    idx: number;
    /**
     * The values of the row.
     */
    rowData: T;
    /**
     * The double click event.
     */
    e: React.SyntheticEvent<any>;
  }

  /**
   * Information about a copy paste
   */
  interface CellCopyPasteEvent {
    /**
     * The row that was pasted to.
     */
    rowIdx: number;
    /**
     * The value that was pasted.
     */
    value: any;
    /**
     * The row that was copied from.
     */
    fromRow: number;
    /**
     * The row that was pasted to.
     */
    toRow: number;
    /**
     * The key of the column where the copy paste occurred.
     */
    cellKey: string;
  }

  type GridActionBase = 'CELL_DRAG' | 'CELL_UPDATE' | 'COLUMN_FILL' | 'COPY_PASTE';

  type GridAction<T = any> = GridActionBase | T;

  /**
   * Information about some update to the grid's contents
   */
  interface GridRowsUpdatedEvent<RowData extends {} = KeyValueAny, CustomGridAction = any> {
    /**
     * The key of the column where the event occurred.
     */
    cellKey: string;
    /**
     * The top row affected by the event.
     */
    fromRow: number;
    /**
     * The bottom row affected by the event.
     */
    toRow: number;
    /**
     * The columns that were updated and their values.
     */
    updated: { [key: string]: any };
    /**
     * The action that occurred to trigger this event.
     * One of 'CELL_DRAG' | 'CELL_UPDATE' | 'COLUMN_FILL' | 'COPY_PASTE'.
     */
    action: GridAction<CustomGridAction>;
    /**
     * The modified row data before changing.
     */
    fromRowData: RowData;
    /**
     * The uniq id for the fromRow.
     * e.g.
     * const rowKey = 'uniqKey';
     * const fromRowId = row[rowKey]; // which is row.uniqKey;
     */
    fromRowId: string;
    /**
     * The row ids that are involved in the action
     */
    rowIds: string[];
    /**
     * The uniq id for the toRow
     */
    toRowId: string;
  }

  /**
   * Some filter to be applied to the grid's contents
   */
  interface Filter {
    /**
     * The key of the column being filtered.
     */
    columnKey: string;
    /**
     * The term to filter by.
     */
    filterTerm: string;
  }

  /**
   * Some grouping to be applied to the grid's contents
   */
  interface ColumnGroup {
    /**
     * The coumn key for the friendly description of the group .
     */
    key: string
    /**
     * The coumn name for the friendly description of the group .
     */
    name: string
  }

  /**
 * Some grouping to be applied to the grid's contents
 */
  interface ColumnGroupButtonProps {
    /**
     * The coumn key for the friendly description of the group .
     */
    columnKey: string
    /**
     * The coumn name for the friendly description of the group .
     */
    name: string
  }

  interface GroupedGridState<R extends {} = KeyValueAny> {
    rows: R;
    groupBy?: Array<ColumnGroup> | string[];
    expandedRows?: R[];
    filters?: any;
    sortColumn?: string;
    sortDirection?: 'ASC' | 'DESC' | 'NONE';
  }

  interface CellMeta<C extends {} = KeyValueAny, R extends {} = KeyValueAny> {
    rowKey: string;
    onCellClick: (meta: PositionMeta) => void;
    onCellContextMenu: (meta: PositionMeta) => void;
    onCellDoubleClick: (meta: PositionMeta) => void;
    onColumnEvent: (ev: React.SyntheticEvent<any>, args: ColumnEventArgs) => void;
    onCellExpand: (expandMeta: ExpandMeta) => void;
    onRowExpandToggle: ({ columnGroupName, name, shouldExpand }: RowGroupExpandEventProps) => void;
    getCellActions: (column: Column<C>, row: R) => Array<any>;
    onDeleteSubRow: (expandMeta: ExpandMeta) => void;
    onAddSubRow: () => void;
    onDragEnter: ({ overRowIdx }: { overRowIdx: number }) => void;
  }

  interface GridRowRendererProps<C extends {} = KeyValueAny, R extends {} = KeyValueAny> {
    columns: Column<C>[];
    row: R;
    idx: number;
    cellMetaData: CellMeta<C, R>;
    isSelected: boolean;
    height: number;
    contextMenu?: JSX.Element;
    colDisplayStart: number;
    colDisplayEnd: number;
    isScrolling: boolean;
    forceUpdate: boolean;
    colOverscanStartIdx: number;
    colOverscanEndIdx: number;
    subRowDetails?: SubRowDetails;
    renderBaseRow: (props: GridRowRendererProps<R>) => JSX.Element;
  }

  /**
   * Excel-like grid component built with React, with editors, keyboard navigation, copy & paste, and the like
   * http://adazzle.github.io/react-data-grid/
   */
  export class ReactDataGrid extends React.Component<GridProps, {}> {
    openCellEditor(rowIdx: number, idx: number): void;
  }
  export namespace ReactDataGrid {
    // Useful types
    export import GridProps = AdazzleReactDataGrid.GridProps;
    export import Column = AdazzleReactDataGrid.Column;
    export import Filter = AdazzleReactDataGrid.Filter;
    export import CellContent = AdazzleReactDataGrid.CellContent;
    export import EditableMeta = AdazzleReactDataGrid.EditableMeta;

    // Various events
    export import RowUpdateEvent = AdazzleReactDataGrid.RowUpdateEvent;
    export import SelectionParams = AdazzleReactDataGrid.SelectionParams;
    export import CellDragEvent = AdazzleReactDataGrid.CellDragEvent;
    export import DragHandleDoubleClickEvent = AdazzleReactDataGrid.DragHandleDoubleClickEvent;
    export import CellCopyPasteEvent = AdazzleReactDataGrid.CellCopyPasteEvent;
    export import GridRowsUpdatedEvent = AdazzleReactDataGrid.GridRowsUpdatedEvent;
    export import ColumnEventArgs = AdazzleReactDataGrid.ColumnEventArgs;
    export import RowGroupExpandEventProps = AdazzleReactDataGrid.RowGroupExpandEventProps;
    export import SubRowDetails = AdazzleReactDataGrid.SubRowDetails;
    // Actual classes exposed on module.exports
    /**
     * A react component that renders a row of the grid
     */
    export class Row extends React.Component<any, any> { }
    /**
     * A react coponent that renders a cell of the grid
     */
    export class Cell extends React.Component<any, any> { }

    export namespace formatters {
        export class SimpleCellFormatter extends React.Component<any, any> { }
    }
    export import GroupedGridState = AdazzleReactDataGrid.GroupedGridState;
    export import ColumnGroup = AdazzleReactDataGrid.ColumnGroup;
    export import ColumnGroupButtonProps = AdazzleReactDataGrid.ColumnGroupButtonProps;

    export function onToggleFilter(): void;
  }
}

declare module "react-data-grid" {
  import ReactDataGrid = AdazzleReactDataGrid.ReactDataGrid;

  // commonjs export
  export = ReactDataGrid;
}
