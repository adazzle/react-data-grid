import React, { Component } from 'react';

// Wrapper HOC used when having an editor which is a redux container.
// Required since react-data-grid requires access to getInputNode, getValue,
// howvever when doing this.getEditor() in react-data-grid we get a react
// componenet wrapped by the redux connect function and thus wont have access
// to the required methods.
module.exports = (ContainerEditor) => {
  return class ContainerEditorWrapper extends Component {
    getInputNode() {
      return this.editorRef.getInputNode();
    }

    getValue() {
      return this.editorRef.getValue();
    }

    createRef = (ref) => {
      this.editorRef = ref;
    }

    render() {
      return (<ContainerEditor refCallback={this.createRef} {...this.props} />);
    }
  };
};
