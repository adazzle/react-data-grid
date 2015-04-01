/* @flow */
var React = require('react');
class ExcelColumn {
  name: string;
  key: string;
  width: number;
  cellRenderer: (cellData: any, cellDataKey: string, rowData: any, rowIndex: number, columnData: any, width: number ) => ReactElement;
  editor: ?Editor;

}

var ExcelColumnShape = {
  name: React.PropTypes.string.isRequired,
  key: React.PropTypes.string.isRequired,
  width: React.PropTypes.number.isRequired


}

module.exports = ExcelColumnShape;
