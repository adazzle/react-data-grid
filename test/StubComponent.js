var React = require('react');

module.exports = function(mockTagName: string){
  return class extends React.Component {
    render () {
      var mockTagName = mockTagName || "div";
      return React.DOM[mockTagName](null, this.props.children);
    }
  };
};
