import React from 'react';

export default function(mockTagName) {
  return class extends React.Component {
    render() {
      return React.createFactory(mockTagName || 'div', this.props);
    }
  };
}
