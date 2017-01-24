
module.exports = React.createClass({
  render : function(){
    return(
      <div>
        <p>The rows property should be an array of objects whose property names match the key property of each column</p>
        <div className="code-block js">
          <pre>
            <code className="javascript">{"var _rows = [];\nfor (var i = 0; i < 1000; i++) {\n  _rows.push({\n    id: i,\n    title: \'Title \' + i,\n    count: i * 1000\n  });\n}\n\nvar rowGetter = function(i){\n  return _rows[i];\n};\n\nvar rowsCount = function(){\n  return _rows.length;\n}\n"}
            </code>
          </pre>
        </div>
      </div>)
    }
  })
