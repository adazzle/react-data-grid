const React                   = require('react');
const ReactDOM = require('react-dom');
const ExcelColumn             = require('../PropTypeShapes/ExcelColumn');

class EditorBase extends React.Component {

  getStyle(): {width: string} {
    return {
      width: '100%'
    };
  }

  getValue(): any {
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

  inheritContainerStyles(): boolean {
    return true;
  }

}

EditorBase.propTypes = {
  onKeyDown: React.PropTypes.func.isRequired,
  value: React.PropTypes.any.isRequired,
  onBlur: React.PropTypes.func.isRequired,
  column: React.PropTypes.shape(ExcelColumn).isRequired,
  commit: React.PropTypes.func.isRequired
};

module.exports = EditorBase;

