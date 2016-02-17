var QuickStartDescription = require('../components/QuickStartDescription')
var ReactPlayground       = require('../assets/js/ReactPlayground');
var faker = require('faker');

var AllFeaturesExample = `
  var Editors             = ReactDataGrid.Editors;
  var Toolbar             = ReactDataGrid.Toolbar;
  var AutoCompleteEditor  = Editors.AutoComplete;
  var DropDownEditor      = Editors.DropDownEditor;

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

  var counties = [{id : 0, title : 'Bedfordshire'}, { id : 1, title : 'Berkshire'}, { id : 2, title : 'Buckinghamshire'}, { id : 3, title : 'Cambridgeshire'}, { id : 4, title : 'Cheshire'}, { id : 5, title :'Cornwall'}, {id : 6, title : 'Cumbria, (Cumberland)'}, {id : 7, title : 'Derbyshire'}, { id : 8, title :'Devon'}, { id : 9, title :'Dorset'},
   { id : 10, title :'Durham'},
   { id : 11, title :'Essex'},
   { id : 12, title :'Gloucestershire'},
   { id : 13, title :'Hampshire'},
   { id : 14, title :'Hertfordshire'},
   { id : 15, title :'Huntingdonshire'},
   { id : 16, title :'Kent'},
   { id : 17, title :'Lancashire'},
   { id : 18, title :'Leicestershire'},
   { id : 19, title :'Lincolnshire'},
   { id : 20, title :'Middlesex'},
   { id : 21, title :'Norfolk'},
   { id : 22, title :'Northamptonshire'},
   { id : 23, title :'Northumberland'},
   { id : 24, title :'Nottinghamshire'},
   { id : 25, title :'Northamptonshire'},
   { id : 26, title :'Oxfordshire'},
   { id : 27, title :'Northamptonshire'},
   { id : 28, title :'Rutland'},
   { id : 29, title :'Shropshire'},
   { id : 30, title :'Somerset'},
   { id : 31, title :'Staffordshire'},
   { id : 32, title :'Suffolk'},
   { id : 33, title :'Surrey'},
   { id : 34, title :'Sussex'},
   { id : 35, title :'Warwickshire'},
   { id : 36, title :'Westmoreland'},
   { id : 37, title :'Wiltshire'},
   { id : 38, title :'Worcestershire'},
   { id : 39, title :'Yorkshire'}]

  var titles = ['Dr.', 'Mr.', 'Mrs.', 'Miss', 'Ms.'];

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
      formatter : ReactDataGrid.Formatters.ImageFormatter,
      resizable : true
    },
    {
      key: 'county',
      name: 'County',
      editor: <AutoCompleteEditor options={counties}/>,
      width : 200,
      resizable: true
    },
    {
      key: 'title',
      name: 'Title',
      editor : <DropDownEditor options={titles}/>,
      width : 200,
      resizable: true
    },
    {
      key: 'firstName',
      name: 'First Name',
      editable:true,
      width : 200,
      resizable: true
    },
    {
      key: 'lastName',
      name: 'Last Name',
      editable:true,
      width : 200,
      resizable: true
    },
    {
      key: 'email',
      name: 'Email',
      editable:true,
      width : 200,
      resizable: true
    },
    {
      key: 'street',
      name: 'Street',
      editable:true,
      width : 200,
      resizable: true
    },
    {
      key: 'zipCode',
      name: 'ZipCode',
      editable:true,
      width : 200,
      resizable: true
    },
    {
      key: 'date',
      name: 'Date',
      editable:true,
      width : 200,
      resizable: true
    },
    {
      key: 'bs',
      name: 'bs',
      editable:true,
      width : 200,
      resizable: true
    },
    {
      key: 'catchPhrase',
      name: 'Catch Phrase',
      editable:true,
      width : 200,
      resizable: true
    },
    {
      key: 'companyName',
      name: 'Company Name',
      editable:true,
      width : 200,
      resizable: true
    },
    {
      key: 'sentence',
      name: 'Sentence',
      editable:true,
      width : 200,
      resizable: true
    }
  ];


 var Example = React.createClass({displayName: 'component',

    getInitialState : function(){
      var fakeRows = createRows(2000);
      return {rows :fakeRows};
    },

    handleGridRowsUpdated : function(updatedRowData) {
      var rows = this.state.rows;

      for (var i = updatedRowData.fromRow; i <= updatedRowData.toRow; i++) {
        var rowToUpdate = rows[i];
        var updatedRow = React.addons.update(rowToUpdate, {$merge: updatedRowData.updated});
        rows[i] = updatedRow;
      }

      this.setState({rows: rows});
    },

    handleAddRow : function(e){
      var newRow = {
        value: e.newRowIndex,
        userStory: '',
        developer : '',
        epic : ''};
        var rows = React.addons.update(this.state.rows, {$push : [newRow]});
        this.setState({rows : rows});
    },

    getRowAt : function(index){
      if (index < 0 || index > this.getSize()){
        return undefined;
      }
      return this.state.rows[index];
    },

    getSize : function() {
      return this.state.rows.length;
    },

    render : function() {
      return (
            <ReactDataGrid
              enableCellSelect={true}
              columns={columns}
              rowGetter={this.getRowAt}
              rowsCount={this.getSize()}
              onGridRowsUpdated={this.handleGridRowsUpdated}
              toolbar={<Toolbar onAddRow={this.handleAddRow}/>}
              enableRowSelect={true}
              rowHeight={50}
              minHeight={600}
              rowScrollTimeout={200}
              />

      );
    }
  });
  ReactDOM.render(<Example />, mountNode);
`;


module.exports = React.createClass({

  render: function() {
    return(
      <div>
        <h3>All the features grid</h3>
        <p>This example demonstrates all the features from the previous examples. The ReactDataGrid with addons is globally available in this example so you need to have 'react-data-grid-with-addons.js' on the page or require('react-data-grid'/addons) if you are using Common JS.</p>
        <p>Fake data is generated using the <a href="https://github.com/Marak/faker.js">Faker</a> library which is also a global variable in this example.</p>
        <ReactPlayground codeText={AllFeaturesExample} />
      </div>
    )
  }

});
