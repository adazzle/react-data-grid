var QuickStartDescription = require('../components/QuickStartDescription')
var ReactPlayground       = require('../assets/js/ReactPlayground');
var faker = require('faker');
var Immutable = require('immutable');

var GroupingExample = `
  var Editors             = ReactDataGridPlugins.Editors;
  var Toolbar             = ReactDataGridPlugins.ToolsPanel.AdvancedToolbar;
  var Selectors = ReactDataGridPlugins.Data.Selectors;
  var GroupedColumnsPanel = ReactDataGridPlugins.ToolsPanel.GroupedColumnsPanel;
  var DraggableContainer = ReactDataGridPlugins.Draggable.Container;
  faker.locale = 'en_GB';

  var _rows = [];
  var _cols = [];
  for(var j = 0; j < 50; j++){
      _cols.push({key: 'col' + j, name: 'col' + j, width: 150, editable:true, draggable: true});
  };

  for (var rowIdx = 1; rowIdx < 100; rowIdx++) {
    var row = {};
    _cols.forEach(function(c, colIdx){
      row[c.key] = '(' + colIdx + ',' + rowIdx + ')';
    });
    _rows.push(row);
  }

  var CustomToolbar = React.createClass({
    render() {
      return (<Toolbar>
        <GroupedColumnsPanel groupBy={this.props.groupBy} onColumnGroupAdded={this.props.onColumnGroupAdded} onColumnGroupDeleted={this.props.onColumnGroupDeleted}/>
        </Toolbar>);
    }
  });

 var Example = React.createClass({displayName: 'component',

    getInitialState : function(){
      //var fakeRows = createRows(2000);
      return { 
        rows : new Immutable.fromJS(_rows), 
        cols: new Immutable.List(_cols), 
        groupBy: [], 
        expandedRows: {}
      };
    },

    getRows: function() {
      var rows = Selectors.getRows(this.state);
      return rows;
    },

    getRowAt : function(index){
      var rows = this.getRows();
      return rows.get(index);
    },

    getSize : function() {
      return this.getRows().size;
    },

   onColumnGroupAdded: function(colName) {
      let columnGroups = this.state.groupBy.slice(0);
      if(columnGroups.indexOf(colName) === -1) {
        columnGroups.push(colName);
      }
      this.setState({groupBy: columnGroups});
    },
    
    onColumnGroupDeleted: function (name) {
      let columnGroups = this.state.groupBy.filter(function(g){return g !== name});
      this.setState({groupBy: columnGroups});
    },
    
    onRowExpandToggle: function(args){
      let expandedRows = Object.assign({}, this.state.expandedRows);
      expandedRows[args.columnGroupName] = Object.assign({}, expandedRows[args.columnGroupName]);
      expandedRows[args.columnGroupName][args.name] = { isExpanded: args.shouldExpand };
      this.setState({expandedRows: expandedRows});
    },

    render : function() {
      return (
        <DraggableContainer>
            <ReactDataGrid
              ref='grid'
              enableCellSelect={true}
              enableDragAndDrop={true}
              columns={_cols}
              rowGetter={this.getRowAt}
              rowsCount={this.getSize()}
              onRowExpandToggle={this.onRowExpandToggle}
              toolbar={<CustomToolbar groupBy={this.state.groupBy} onColumnGroupAdded={this.onColumnGroupAdded} onColumnGroupDeleted={this.onColumnGroupDeleted}/>}
              rowHeight={50}
              minHeight={600}
              />
        </DraggableContainer>
      );
    }
  });
  ReactDOM.render(<Example />, mountNode);
`;


module.exports = React.createClass({

  render: function() {
    return(
      <div>
        <h3>Row Grouping Example</h3>
        <p>This example demonstrates how to group rows by column name. Drag a column header to group rows by that column.</p>
        <p>To expand and close a row group, you can use either the mouse or keyboard</p>
        <p>Press <strong>Enter</strong> or <strong>Left Arrow</strong> or <strong>Right Arrow</strong> to toggle whether a row is expanded or not</p>
        <p>This feature also supports a custom Renderer, by using a renderer you can render some fancy custom html in the row gorup.</p>
        <p>To use a renderer just inject your component with <code>rowGroupRenderer</code> prop in the grid.</p>
        <ReactPlayground codeText={GroupingExample} />
      </div>
    )
  }

});
