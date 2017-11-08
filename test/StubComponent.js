var React = require('react');
var createReactClass = require('create-react-class');

module.exports = function(mockTagName: string){
  return createReactClass({
    render: function() {
      var mockTagName = mockTagName || "div";
      return React.DOM[mockTagName](null, this.props.children);
    }
  });
};
