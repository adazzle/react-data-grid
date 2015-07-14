var React = require('react');

module.exports = function(mockTagName: string){
  return React.createClass({
    render: function() {
      var mockTagName = mockTagName || "div";
      return React.DOM[mockTagName](null, this.props.children);
    }
  });
};
