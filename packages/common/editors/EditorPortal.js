import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default class EditorPortal extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    target: PropTypes.node.isRequired
  };

  el = document.createElement('div');

  componentDidMount() {
    // The portal element is inserted in the DOM tree after
    // the Modal's children are mounted, meaning that children
    // will be mounted on a detached DOM node. If a child
    // component requires to be attached to the DOM tree
    // immediately when mounted, for example to measure a
    // DOM node, or uses 'autoFocus' in a descendant, add
    // state to Modal and only render the children when Modal
    // is inserted in the DOM tree.
    this.props.target.appendChild(this.el);
  }

  componentWillUnmount() {
    this.props.target.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(
      this.props.children,
      this.el,
    );
  }
}
