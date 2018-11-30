const ReactDataGrid = require('react-data-grid');
const exampleWrapper = require('../components/exampleWrapper');
const React = require('react');

class Example extends React.Component {
  constructor(props) {
    super(props);
    this._columns = [
      {
        key: 'id',
        name: 'ID'
      },
      {
        key: 'title',
        name: 'Title'
      },
      {
        key: 'count',
        name: 'Count'
      }
    ];

    let rows = [];
    for (let i = 1; i < 1000; i++) {
      rows.push({
        id: i,
        title: 'Title ' + i,
        count: i * 1000
      });
    }
    this.state = { rows, selectedIndexes: [] };
  }

  rowGetter = (i) => {
    return this.state.rows[i];
  };

  onRowsSelected = (rows) => {
    this.setState({selectedIndexes: this.state.selectedIndexes.concat(rows.map(r => r.rowIdx))});
  };

  onRowsDeselected = (rows) => {
    let rowIndexes = rows.map(r => r.rowIdx);
    this.setState({selectedIndexes: this.state.selectedIndexes.filter(i => rowIndexes.indexOf(i) === -1 )});
  };

  render() {
    const rowText = this.state.selectedIndexes.length === 1 ? 'row' : 'rows';
    return  (
      <div>
        <span>{this.state.selectedIndexes.length} {rowText} selected</span>
        <ReactDataGrid
          rowKey="id"
          columns={this._columns}
          rowGetter={this.rowGetter}
          rowsCount={this.state.rows.length}
          minHeight={500}
          rowSelection={{
            showCheckbox: true,
            enableShiftSelect: true,
            onRowsSelected: this.onRowsSelected,
            onRowsDeselected: this.onRowsDeselected,
            selectBy: {
              indexes: this.state.selectedIndexes
            }
          }} />
      </div>);
  }
}

const exampleDescription = (
  <div>
    <p>Row selection is enabled via the <code>rowSelection</code> prop (object). The following keys control behaviour:</p>
    <h4>selectBy</h4>
    <p>
      This allows rows to be selected programatically. The options are:<br/>
      indexes - <code dangerouslySetInnerHTML={{__html: "selectBy: {indexes: [0, 1, 2]}"}}/> to select rows by index.<br/>
      keys - <code dangerouslySetInnerHTML={{__html: "selectBy: {keys: {rowKey: 'title', values: ['Title1', 'Title2']}}"}}/> to select rows by specified key and values.<br/>
      isSelectedKey - <code dangerouslySetInnerHTML={{__html: "selectBy: {isSelectedKey: 'isSelected'}"}}/> to select rows by specified key (based on value being truthy or falsy).
    </p>
    <h4>onRowsSelected/onRowsDeselected</h4>
    <p>
      When rows are selected or de-selected, <code>onRowsSelected</code> or <code>onRowsDeselected</code> functions will be called (set as props) with an array of <code dangerouslySetInnerHTML={{__html: "{rowIdx, row}"}}/>.<br/>
      This allows for single or multiple selection to be implemented as desired, by either appending to or replacing the list of selected items.
    </p>
    <h4>showCheckbox</h4>
    <p>Allows the row selection checkbox to be hidden (shown by default). Useful for selecting rows programatically and controlling selection via the<code>onRowClick</code> event.</p>
    <h4>enableShiftSelect</h4>
    <p>
      Allows a continuous range of rows to be selected by holding the shift key when clicking the row selection checkbox.
    </p>
    <p><b>Note:</b> These props supercede the existing <code>enableRowSelect</code> and <code>onRowUpdated</code> props which will be removed in a later release.</p>
  </div>
);

module.exports = exampleWrapper({
  WrappedComponent: Example,
  exampleName: 'Row Selection',
  exampleDescription,
  examplePath: './scripts/example16-row-select.js',
  examplePlaygroundLink: 'https://jsfiddle.net/f6mbnb8z/5/'
});
