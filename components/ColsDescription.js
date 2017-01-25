module.exports = React.createClass({
  render : function(){
    return(
      <div>
        <p>The columns property is an array of objects that has at a minimum key and name properties</p>
        <div className="code-block js">
          <pre>{"var columns = [\n{\n  key: \'id\',\n  name: \'ID\'\n},\n{\n  key: \'title\',\n  name: \'Title\'\n},\n{\n  key: \'count\',\n  name: \'Count\'\n}]\n\}"}
          </pre>
        </div>
      </div>)
    }
  })
