import React from 'react';

module.exports = function(mockTagName) {
  return class extends React.Component {
    render() {
      return React.createFactory(mockTagName || 'div', this.props);
    }
  };
};
