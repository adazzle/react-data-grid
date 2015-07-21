/**
 * @jsx React.DOM
 */
(function(){
  var React       = require('react')
  var ReactDataGrid       = require('../../src/addons')
  var Editors             = ReactDataGrid.Editors;
  var Toolbar             = ReactDataGrid.Toolbar;
  var AutoCompleteEditor  = Editors.AutoComplete;
  var DropDownEditor      = Editors.DropDownEditor;
  var joinClasses          = require('classnames');
  var FakeObjectDataStore = require('./FakeObjectDataStore');
  var counties = [{value : 'Bedfordshire', label : 'Bedfordshire'}, { value : 'Berkshire', label : 'Berkshire'}, { value : 'Buckinghamshire', label : 'Buckinghamshire'}, { value : 'Cambrvaluegeshire', label : 'Cambrvaluegeshire'}, { value : 'Cheshire', label : 'Cheshire'}, { value : 'Cornwall', label :'Cornwall'}, {value : 'Cumbria, (Cumberland)', label : 'Cumbria, (Cumberland)'}, {value : 'Derbyshire', label : 'Derbyshire'}, { value : 'Devon', label :'Devon'}, { value : 'Dorset', label :'Dorset'},
   { value : 'Durham', label :'Durham'},
   { value : 'Essex', label :'Essex'},
   { value : 'Gloucestershire', label :'Gloucestershire'},
   { value : 'Hampshire', label :'Hampshire'},
   { value : 'Hertfordshire', label :'Hertfordshire'},
   { value : 'Huntingdonshire', label :'Huntingdonshire'},
   { value : 'Kent', label :'Kent'},
   { value : 'Lancashire', label :'Lancashire'},
   { value : 'Leicestershire', label :'Leicestershire'},
   { value : 'Lincolnshire', label :'Lincolnshire'},
   { value : 'Mvaluedlesex', label :'Mvaluedlesex'},
   { value : 'Norfolk', label :'Norfolk'},
   { value : 'Northamptonshire', label :'Northamptonshire'},
   { value : 'Northumberland', label :'Northumberland'},
   { value : 'Nottinghamshire', label :'Nottinghamshire'},
   { value : 'Northamptonshire', label :'Northamptonshire'},
   { value : 'Oxfordshire', label :'Oxfordshire'},
   { value : 'Northamptonshire', label :'Northamptonshire'},
   { value : 'Rutland', label :'Rutland'},
   { value : 'Shropshire', label :'Shropshire'},
   { value : 'Somerset', label :'Somerset'},
   { value : 'Staffordshire', label :'Staffordshire'},
   { value : 'Suffolk', label :'Suffolk'},
   { value : 'Surrey', label :'Surrey'},
   { value : 'Sussex', label :'Sussex'},
   { value : 'Warwickshire', label :'Warwickshire'},
   { value : 'Westmoreland', label :'Westmoreland'},
   { value : 'Wiltshire', label :'Wiltshire'},
   { value : 'Worcestershire', label :'Worcestershire'},
   { value : 'Yorkshire', label :'Yorkshire'}];

var titles = ['Dr.', 'Mr.', 'Mrs.', 'Miss', 'Ms.'];


  var columns = new Immutable.List([
    {
      key: 'id',
      name: 'ID',
      width : 80,
    },
    {
      key: 'avartar',
      name: 'Avartar',
      width : 60,
      formatter : ReactDataGrid.Formatters.ImageFormatter,
      resizeable : true
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
      editor : <DropDownEditor options={titles}/>,
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
      key: 'sentence',
      name: 'Sentence',
      editable:true,
      width : 200
    }
  ]);


 var Component = React.createClass({displayName: 'component',

    getInitialState : function(){
      var fakeRows = FakeObjectDataStore.createRows(100);
      return {rows : Immutable.fromJS(fakeRows)};
    },

    handleRowUpdated : function(commit){
      //merge the updated row values with the existing row
      var newRows = this.state.rows.update(commit.rowIdx, function(r) {
        return r.merge(commit.updated);
      });
      this.setState({rows: newRows});
    },

    handleCellDrag : function(e){
        var rows = this.state.rows;
        for (var i = e.fromRow; i <= e.toRow; i++){
          rows = rows.update(i, function(r){
            return r.set(e.cellKey, e.value);
          });
        }
        if(this.props.handleCellDrag) {this.props.handleCellDrag(e)}
        this.setState({rows:rows});
    },

    handleCellCopyPaste : function(e){
      var rows = this.state.rows.update(e.toRow, function(r) {
        return r.set(e.cellKey, e.value);
      });
      this.setState({rows:rows});
    },

    handleAddRow : function(e){
      var newRow = {
        id: e.newRowIndex,
        userStory: '',
        developer : '',
        epic : ''};
        var rows = this.state.rows.push(newRow);
        this.setState({rows : rows});
    },

    getRowAt(index){
      if (index < 0 || index > this.getSize()){
        return undefined;
      }
      return this.state.rows.get(index);
    },

    getSize() {
      return this.state.rows.size;
    },

    render() {
      return (
            <ReactDataGrid
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
