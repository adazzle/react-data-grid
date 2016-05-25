const React = require('react');
const EditorBase = require('./EditorBase');

class CellCheckboxEditor extends EditorBase {

  onChange() {
    this.props.onCommit();
  }
  render(): ? ReactElement {
    const {value} = this.props;
    let checked = value !== null ? value : false;
    return <div><input type="checkbox" defaultChecked={checked} style={{maxHeight: '18px', maxWidth: '18px'}}/></div>;
  }
}

CellCheckboxEditor.propTypes = {
  value: React.PropTypes.bool
};

module.exports = CellCheckboxEditor;
