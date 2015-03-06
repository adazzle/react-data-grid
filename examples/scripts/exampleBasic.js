/* @flow */
var React = require('react/addons');
var ReactGrid = require('../build/ReactGrid');
var getRows   = require('./getRows');
var QuickStartDescription = require('./components/QuickStartDescription')

var columns = [
{
  key: 'id',
  name: 'ID'
},
{
  key: 'title',
  name: 'Title'
},
{
  key: 'count',
  name: 'Count'
}
]
var Example = React.createClass({

  render:function(): ?ReactElement {
    return(
      <div>
        <QuickStartDescription title="A Simple Example"/>
        <ReactGrid rows={getRows(0,100)} columns={columns}/>
      </div>
      )
  }

});

module.exports = Example;
