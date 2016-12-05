
var QuickStartDescription = require('../components/QuickStartDescription')
var ReactPlayground       = require('../assets/js/ReactPlayground');


var SimpleExample = `
var Example = React.createClass({
  getInitialState: function(){
    var rows = [];
    for (var i = 1; i < 1000; i++) {
      rows.push({
        id: i,
        title: 'Title ' + i,
        count: i * 1000
      });
    }
    return {rows, selectedIndexes: []};
  },
  getColumns: function() {
    return  [
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
  },
  rowGetter: function(i) {
    return this.state.rows[i];
  },
  onRowsSelected: function(rows) {
    this.setState({selectedIndexes: this.state.selectedIndexes.concat(rows.map(r => r.rowIdx))});
  },
  onRowsDeselected: function(rows) {
    var rowIndexes = rows.map(r => r.rowIdx);
    this.setState({selectedIndexes: this.state.selectedIndexes.filter(i => rowIndexes.indexOf(i) === -1 )});
  },
  render: function() {
    var rowText = this.state.selectedIndexes.length === 1 ? 'row' : 'rows';
    return  (
      <div>
        <span>{this.state.selectedIndexes.length} {rowText} selected</span>
        <ReactDataGrid
          rowKey='id'
          columns={this.getColumns()}
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
});
ReactDOM.render(<Example />, mountNode);
`;

module.exports = React.createClass({

  render:function(){
    return(
      <div>
        <h3>Row Selection</h3>
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
        <ReactPlayground codeText={SimpleExample} />
      </div>
    )
  }

});
