var RowsDescription = require('./RowsDescription')
var HightlightMixin = require('../highlightMixin');

module.exports = React.createClass({

  mixins : [HightlightMixin],

  render : function(){
    return(
      <div>
      <h3 id="js-basic-example">{this.props.title}</h3>
      <p>In order to display a simple uneditable grid, all that is required is to pass an array of columns and rows as props to ReactGrid. The columns is a column specification, it provides information to grid on how to extract data for each of the column and how column should be represented and its features:</p>
      <div className="code-block js">
      <pre>
      <code className="javascript">{"var columns = [{ key: 'id', name: 'ID' }, { key: 'title', name: 'Title' }, { key: 'count', name: 'Count' } ]"}
      </code>
      </pre>
      </div>

      <RowsDescription/>

      <p>Now simply invoke React.render(..) passing the array of rows and columns as props</p>
      <div className="code-block js">
      <pre><code className="javascript">{"React.render(<ReactGrid columns={columns} rows={getRows(0,100)} />, document.getElementById('example'))"}</code></pre>
      </div>
      </div>
    );
  }
});
