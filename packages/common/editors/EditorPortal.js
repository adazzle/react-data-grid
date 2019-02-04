import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const editorRoot = document.body;

export default class EditorPortal extends React.Component {
  static propTypes = {
    children: PropTypes.node
  };

  el = document.createElement('div');

  componentDidMount() {
    editorRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    editorRoot.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(
      this.props.children,
      this.el,
    );
  }
}
