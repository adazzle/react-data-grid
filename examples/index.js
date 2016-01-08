var React = require('react')
var ReactDom = require('react-dom')

window.React = React;

var ReactDataGrid = require('./scripts/example14-all-features-immutable');
ReactDom.render(<ReactDataGrid/>, document.getElementById('excel-example'));
