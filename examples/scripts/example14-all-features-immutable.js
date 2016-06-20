(function(){
  var React       = require('react');
  var ReactDataGrid = require('../build/react-data-grid');
  var UIPlugins       = require('../build/react-data-grid.ui-plugins');
  var Editors             = ReactDataGridPlugins.Editors;
  var Toolbar             = ReactDataGridPlugins.Toolbar;
  var AutoCompleteEditor  = Editors.AutoComplete;
  var DropDownEditor      = Editors.DropDownEditor;
  var joinClasses          = require('classnames');
  var FakeObjectDataStore = require('./FakeObjectDataStore');
  var {ContextMenu, MenuItem} = ReactDataGridPlugins.Menu;
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


  var columns = new Immutable.List([
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
      resizable : true
    },
    {
      key: 'county',
      name: 'County',
      editor: <AutoCompleteEditor options={counties} onCommit={() => {}} column={{name:'county', key:'county', width: 200}} value='wicklow'/>,
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
  ]);

var MyContextMenu = React.createClass({
  onItemClick: function(e, data) {
    // alert('Row: ' + (data.rowIdx + 1) + ', Column: ' + (data.idx + 1));
  },
  render: function() {
    return (
      <ContextMenu>
        <MenuItem data={{rowIdx: this.props.rowIdx, idx: this.props.idx}} onClick={this.onItemClick}>{this.props.rowIdx},{this.props.idx}</MenuItem>
      </ContextMenu>
    );
  }
});

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
              contextMenu={<MyContextMenu />}
              ref='reactDataGrid'
              enableCellSelect={true}
              columns={columns}
              rowGetter={this.getRowAt}
              rowsCount={this.getSize()}
              onRowUpdated={this.handleRowUpdated}
              onCellsDragged={this.handleCellDrag}
              onCellCopyPaste={this.handleCellCopyPaste}
              toolbar={<Toolbar onAddRow={this.handleAddRow} onToggleFilter={()=>{}} numberOfRows={this.getSize()}/>}
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