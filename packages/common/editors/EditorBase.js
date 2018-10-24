const React                   = require('react');
const ReactDOM = require('react-dom');
import ExcelColumn from 'common/prop-shapes/ExcelColumn';
import PropTypes from 'prop-types';

class EditorBase extends React.Component {

  getStyle() {
    return {
      width: '100%'
    };
  }

  getValue() {
    let updated = {};
    updated[this.props.column.key] = this.getInputNode().value;
    return updated;
  }

  getInputNode() {
    let domNode = ReactDOM.findDOMNode(this);
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
  column: PropTypes.shape(ExcelColumn).isRequired,
  commit: PropTypes.func.isRequired
};

module.exports = EditorBase;

