var QuickStartDescription = require('../components/QuickStartDescription')
var ReactPlayground       = require('../assets/js/ReactPlayground');
var faker = require('faker');

var GroupingExample = `
  var Editors             = ReactDataGridPlugins.Editors;
  var Toolbar             = ReactDataGridPlugins.ToolsPanel.AdvancedToolbar;
  var Selectors = ReactDataGridPlugins.Data.Selectors;
  var GroupedColumnsPanel = ReactDataGridPlugins.ToolsPanel.GroupedColumnsPanel;
  var DraggableContainer = ReactDataGridPlugins.Draggable.Container;
  faker.locale = 'en_GB';

  function createFakeRowObjectData(/*number*/ index) {
    return {
      id: 'id_' + index,
      avartar: faker.image.avatar(),
      county: faker.address.county(),
      email: faker.internet.email(),
      title: faker.name.prefix(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      street: faker.address.streetName(),
      zipCode: faker.address.zipCode(),
      date: faker.date.past().toLocaleDateString(),
      bs: faker.company.bs(),
      catchPhrase: faker.company.catchPhrase(),
      companyName: faker.company.companyName(),
      words: faker.lorem.words(),
      sentence: faker.lorem.sentence()
    };
  }

  function createRows(numberOfRows) {
    var rows = [];
    for (var i = 0; i < numberOfRows; i++) {
      rows[i] = createFakeRowObjectData(i);
    }
    return rows;
  }

  var columns = [
    {
      key: 'id',
      name: 'ID',
      width : 80,
      resizable: true
    },
    {
      key: 'avartar',
      name: 'Avartar',
      width : 60,
      formatter : ReactDataGridPlugins.Formatters.ImageFormatter,
      draggable : true
    },
    {
      key: 'county',
      name: 'County',
      width : 200,
      draggable: true
    },
    {
      key: 'title',
      name: 'Title',
      width : 200,
      draggable: true
    },
    {
      key: 'firstName',
      name: 'First Name',
      width : 200,
      draggable: true
    },
    {
      key: 'lastName',
      name: 'Last Name',
      width : 200,
      draggable: true
    },
    {
      key: 'email',
      name: 'Email',
      width : 200,
      draggable: true
    },
    {
      key: 'street',
      name: 'Street',
      width : 200,
      draggable: true
    },
    {
      key: 'zipCode',
      name: 'ZipCode',
      width : 200,
      draggable: true
    },
    {
      key: 'date',
      name: 'Date',
      width : 200,
      draggable: true
    },
    {
      key: 'bs',
      name: 'bs',
      draggable:true,
      width : 200
    },
    {
      key: 'catchPhrase',
      name: 'Catch Phrase',
      width : 200,
      draggable: true
    },
    {
      key: 'companyName',
      name: 'Company Name',
      width : 200,
      draggable: true
    },
    {
      key: 'sentence',
      name: 'Sentence',
      width : 200,
      draggable: true
    }
  ];

 var CustomToolbar = React.createClass({
   render() {
     return (<Toolbar>
       <GroupedColumnsPanel groupBy={this.props.groupBy} onColumnGroupAdded={this.props.onColumnGroupAdded} onColumnGroupDeleted={this.props.onColumnGroupDeleted}/>
       </Toolbar>);
   }
 });

 var Example = React.createClass({displayName: 'component',

    getInitialState : function(){
      var fakeRows = createRows(2000);
      return {rows: fakeRows, groupBy: [], expandedRows: {}};
    },

    getRows: function() {
      var rows = Selectors.getRows(this.state);
      return rows;
    },

    getRowAt : function(index){
      var rows = this.getRows();
      return rows[index];
    },

    getSize : function() {
      return this.getRows().length;
    },

   onColumnGroupAdded: function(colName) {
      var columnGroups = this.state.groupBy.slice(0);
      if(columnGroups.indexOf(colName) === -1) {
        columnGroups.push(colName);
      }
      this.setState({groupBy: columnGroups});
    },
    
    onColumnGroupDeleted: function (name) {
      var columnGroups = this.state.groupBy.filter(function(g){return g !== name});
      this.setState({groupBy: columnGroups});
    },
    
    onRowExpandToggle: function(args){
      var expandedRows = Object.assign({}, this.state.expandedRows);
      expandedRows[args.columnGroupName] = Object.assign({}, expandedRows[args.columnGroupName]);
      expandedRows[args.columnGroupName][args.name] = {isExpanded: args.shouldExpand};
      this.setState({expandedRows: expandedRows});
    },

    render : function() {
      return (
        <DraggableContainer>
            <ReactDataGrid
              ref='grid'
              enableCellSelect={true}
              enableDragAndDrop={true}
              columns={columns}
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
