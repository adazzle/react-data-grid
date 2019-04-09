import React from 'react';
import ReactDOM from 'react-dom';

interface Props {
  children: React.ReactNode;
  target: Node;
}

interface State {
  isMounted: boolean;
}

export default class EditorPortal extends React.Component<Props, State> {
  // Keep track of when the modal element is added to the DOM
  readonly state: Readonly<State> = {
    isMounted: false
  };

  el = document.createElement('div');

  componentDidMount() {
    this.props.target.appendChild(this.el);
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({ isMounted: true });
  }

  componentWillUnmount() {
    this.props.target.removeChild(this.el);
  }

  render() {
    // Don't render the portal until the component has mounted,
    // So the portal can safely access the DOM.
    if (!this.state.isMounted) {
      return null;
    }

    return ReactDOM.createPortal(
      this.props.children,
      this.el
    );
  }
}
