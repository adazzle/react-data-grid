module.exports = React.createClass({
  render : function(){
    return(
      <div>
        <p>Now simply invoke ReactDOM.render(..):</p>
        <div className="code-block js">
          <pre>{"ReactDOM.render(&lt;ReactDataGrid columns={columns} rows={rows} /&gt;, document.getElementById('example'))"}</pre>
        </div>
      </div>)
    }
  })
