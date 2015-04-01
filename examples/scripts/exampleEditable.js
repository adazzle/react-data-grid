/* @flow */
var React = require('react');
var ReactGrid = require('../build/ReactGrid');
var getRows   = require('./getRows');
var RowsDescription = require('./components/RowsDescription')
var HightlightMixin = require('./highlightMixin');

var Description = React.createClass({

  mixins : [HightlightMixin],

  render : function(): ?ReactElement {
    return(
      <div>
        <h3 id="js-basic-example">Editable Example</h3>
        <p>To make the Grid editable, simply add an editable property to whichever columns you want to be editable. In this case the Title and Count columns will become editable.</p>
        <div className="code-block js">
          <pre>
            <code className="javascript">{"var columns = [\n{ key: 'id', name: 'ID' }, \n{ key: 'title', name: 'Title', editable : true }, \n{ key: 'count', name: 'Count', editable : true } \n]"}
            </code>
          </pre>
      </div>

      <p>One goal of ReactGrid is to allow the end user to manage the grid data how they want. ReactGrid just provides callbacks that can be listened to, to change data as needed. Here we will create our own editable grid React component, which will wrap ReactGrid. We need to hook onto ReactGrids onRowUpdatedEvent and update the row where the commit was made. Finally, make sure cell selection is enabled for the grid by passing enableCellSelect as prop</p>
      <div className="code-block js">
        <pre><code className="javascript">{"var EditableGrid = React.createClass({\n\n   getInitialState : function(){\n     return {rows : getRows(0, 1000)};\n   },\n\n    handleRowUpdated : function(commit){\n     //merge the updated row values with the existing row\n     var rows = this.state.rows;\n     var updatedRow = React.addons.update(rows[commit.rowIdx], {$merge : commit.updated});\n     rows[commit.rowIdx] = updatedRow;\n     this.setState({rows:rows});\n   },\n\n  render : function(){\n    return(<ReactGrid \n       rows={getRows(0,100)} \n      columns={columns} \n      enableCellSelect={true} \n      onRowUpdated={this.handleRowUpdated}/> \n   );\n }\n});"}</code></pre>
      </div>
      </div>
    );
  }
});


var columns = [
{
  key: 'id',
  name: 'ID'
},
{
  key: 'title',
  name: 'Title',
  editable : true
},
{
  key: 'count',
  name: 'Count',
  editable : true
}
]

var EditableGrid = React.createClass({

  getInitialState : function(){
    return {rows : getRows(0, 1000)};
  },


  handleRowUpdated : function(commit){
    //merge the updated row values with the existing row
    var rows = this.state.rows;
    var updatedRow = React.addons.update(rows[commit.rowIdx], {$merge : commit.updated});
    rows[commit.rowIdx] = updatedRow;
    this.setState({rows:rows});
  },

  render : function(): ?ReactElement {
    return(<ReactGrid rows={this.state.rows} columns={columns} enableCellSelect={true} onRowUpdated={this.handleRowUpdated}></ReactGrid>);
  }
});

var Example = React.createClass({

  render:function(): ?ReactElement {
    return(
      <div>
      <Description/>
      <EditableGrid/>
      </div>
    )
  }

});
module.exports = Example;
