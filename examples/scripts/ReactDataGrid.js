/**
 * @jsx React.DOM
 */
(function(){
  var Grid                = ReactDataGrid.Grid;
  var Editors             = ReactDataGrid.Editors;
  var Toolbar             = ReactDataGrid.Toolbar;
  var AutoCompleteEditor  = Editors.AutoComplete;
  var DropDownEditor      = Editors.DropDownEditor;
  var joinClasses          = require('classnames');
  var FakeObjectDataStore = require('./FakeObjectDataStore');
  var developers = ['Conor','Curtis','Danny','Joao','Mo','Rich'];
  var counties = [{value : 0, label : 'Bedfordshire'}, { value : 1, label : 'Berkshire'}, { value : 2, label : 'Buckinghamshire'}, { value : 3, label : 'Cambrvaluegeshire'}, { value : 4, label : 'Cheshire'}, { value : 5, label :'Cornwall'}, {value : 6, label : 'Cumbria, (Cumberland)'}, {value : 7, label : 'Derbyshire'}, { value : 8, label :'Devon'}, { value : 9, label :'Dorset'},
   { value : 10, label :'Durham'},
   { value : 11, label :'Essex'},
   { value : 12, label :'Gloucestershire'},
   { value : 13, label :'Hampshire'},
   { value : 14, label :'Hertfordshire'},
   { value : 15, label :'Huntingdonshire'},
   { value : 16, label :'Kent'},
   { value : 17, label :'Lancashire'},
   { value : 18, label :'Leicestershire'},
   { value : 19, label :'Lincolnshire'},
   { value : 20, label :'Mvaluedlesex'},
   { value : 21, label :'Norfolk'},
   { value : 22, label :'Northamptonshire'},
   { value : 23, label :'Northumberland'},
   { value : 24, label :'Nottinghamshire'},
   { value : 25, label :'Northamptonshire'},
   { value : 26, label :'Oxfordshire'},
   { value : 27, label :'Northamptonshire'},
   { value : 28, label :'Rutland'},
   { value : 29, label :'Shropshire'},
   { value : 30, label :'Somerset'},
   { value : 31, label :'Staffordshire'},
   { value : 32, label :'Suffolk'},
   { value : 33, label :'Surrey'},
   { value : 34, label :'Sussex'},
   { value : 35, label :'Warwickshire'},
   { value : 36, label :'Westmoreland'},
   { value : 37, label :'Wiltshire'},
   { value : 38, label :'Worcestershire'},
   { value : 39, label :'Yorkshire'}]

var labels = ['Mr.', 'Mrs.', 'Miss', 'Ms.'];

  function renderImage(cellData) {
    var ImageFormatter = ReactDataGrid.Formatters.ImageFormatter;
    return <ImageFormatter src={cellData.value} />;
  }

  var columns = [
    {
      key: 'id',
      name: 'id',
      width : 80
    },
    {
      key: 'avartar',
      name: 'Avartar',
      width : 60
    },
    {
      key: 'county',
      name: 'County',
      editor: <AutoCompleteEditor options={counties}/>,
      width : 200
    },
    {
      key: 'title',
      name: 'Title',
      editor : <DropDownEditor options={labels}/>,
      width : 200
    },
    {
      key: 'firstName',
      name: 'First Name',
      editable:true,
      width : 200
    },
    {
      key: 'lastName',
      name: 'Last Name',
      editable:true,
      width : 200
    },
    {
      key: 'email',
      name: 'Email',
      editable:true,
      width : 200
    },
    {
      key: 'street',
      name: 'Street',
      editable:true,
      width : 200
    },
    {
      key: 'zipCode',
      name: 'ZipCode',
      editable:true,
      width : 200
    },
    {
      key: 'date',
      name: 'Date',
      editable:true,
      width : 200
    },
    {
      key: 'bs',
      name: 'bs',
      editable:true,
      width : 200
    },
    {
      key: 'catchPhrase',
      name: 'Catch Phrase',
      editable:true,
      width : 200
    },
    {
      key: 'companyName',
      name: 'Company Name',
      editable:true,
      width : 200
    },
    {
      key: 'words',
      name: 'Words',
      editable:true,
      width : 200
    },
    {
      key: 'sentence',
      name: 'Sentence',
      editable:true,
      width : 200
    }
  ]


 var Component = React.createClass({displayName: 'component',

    getInitialState : function(){
      return {rows : FakeObjectDataStore.createRows(2000)};
    },

    handleRowUpdated : function(commit){
      //merge the updated row values with the existing row
      var rows = this.state.rows;
      var updatedRow = React.addons.update(rows[commit.rowIdx], {$merge : commit.updated});
      rows[commit.rowIdx] = updatedRow;
      this.setState({rows:rows});
    },

    handleCellDrag : function(e){
        var rows = this.state.rows;
        for (var i = e.fromRow; i <= e.toRow; i++){
          var rowToChange = rows[i];
          if(rowToChange){
            rowToChange[e.cellKey] = e.value;
          }
        }
        this.setState({rows:rows});
    },

    handleCellCopyPaste : function(e){
      var rows = this.state.rows;
      rows[e.toRow][e.cellKey] = e.value;
      this.setState({rows:rows});
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

    getRowAt(index){
      if (index < 0 || index > this.getSize()){
        return undefined;
      }
      return this.state.rows[index];
    },

    getSize() {
      return this.state.rows.length;
    },

    render() {
      return (
            <Grid
              enableCellSelect={true}
              columns={columns}
              rowGetter={this.getRowAt}
              rowsCount={this.getSize()}
              onRowUpdated={this.handleRowUpdated}
              onCellsDragged={this.handleCellDrag}
              onCellCopyPaste={this.handleCellCopyPaste}
              toolbar={<Toolbar onAddRow={this.handleAddRow}/>}
              enableRowSelect={true}
              rowHeight={50}
              minHeight={600}
              />

      );
    }
  });

  if(typeof module !== 'undefined' && module.exports){
    module.exports = Component;
  }else{
    this.ReactDataGrid = Component;
  }


}).call(this);
