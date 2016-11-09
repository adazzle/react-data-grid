import React, { Component } from 'react';

// Wrapper componenet used when having an editor which is a redux container.
// Required since react-data-grid requires access to getInputNode, getValue,
// howvever when doing this.getEditor() in react-data-grid we get a react
// componenet wrapped by the redux connect function and thus wont have access
// to the required methods.
export class ContainerEditorWrapper extends Component {
  constructor(props, context) {
    super(props, context);

    this.setEditorRef = this.setEditorRef.bind(this);
  }

  getInputNode() {
    return this.editorRef.getInputNode();
  }

  getValue() {
    return this.editorRef.getValue();
  }

  setEditorRef(ref) {
    this.editorRef = ref;
  }

  render() {
    let EditorComponent = this.props.editorComponent;
    return (<EditorComponent refCallback={this.setEditorRef} {...this.props} />);
  }
}

ContainerEditorWrapper.propTypes = {
  value: React.PropTypes.string.isRequired,
  column: React.PropTypes.object.isRequired,
  rowData: React.PropTypes.isRequired,
  editorComponent: React.PropTypes.object.isRequired
};

export default ContainerEditorWrapper;
