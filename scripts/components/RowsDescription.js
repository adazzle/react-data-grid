/**
* @jsx React.DOM
*/
module.exports = React.createClass({
  render : function(){
    return(
      <div>
        <p>The rows property should be an array of objects whose property names match the key property of each column</p>
        <div className="code-block js">
          <pre>
            <code className="javascript">{"var getRows = function(start, end) {\n var result = []; \n   for (var i = start; i < end; i++) {\n     result.push({id: i,title: 'Title ' + i, count: i * 1000 }); \n    } \n  return result; \n}"}
            </code>
          </pre>
        </div>
      </div>)
    }
  })
