/* @flow */

class ExcelColumn {
  name: string;
  key: string;
  width: number;
  cellRenderer: (cellData: any, cellDataKey: string, rowData: any, rowIndex: number, columnData: any, width: number ) => ReactElement;
  editor: ?Editor;

}
module.exports = ExcelColumn;
