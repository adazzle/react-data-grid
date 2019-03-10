import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import Column from 'common/prop-shapes/Column';

export default class EditorBase extends React.Component {

  getStyle() {
    return {
      width: '100%'
    };
  }

  getValue() {
    const updated = {};
    updated[this.props.column.key] = this.getInputNode().value;
    return updated;
  }

  getInputNode() {
    const domNode = ReactDOM.findDOMNode(this);
    if (domNode.tagName === 'INPUT') {
      return domNode;
    }

    return domNode.querySelector('input:not([type=hidden])');
  }

  inheritContainerStyles() {
    return true;
  }

}

EditorBase.propTypes = {
  onKeyDown: PropTypes.func.isRequired,
  value: PropTypes.any.isRequired,
  onBlur: PropTypes.func.isRequired,
  column: PropTypes.shape(Column).isRequired,
  commit: PropTypes.func.isRequired
};

