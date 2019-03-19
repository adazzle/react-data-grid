import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default function focusableComponentWrapper(WrappedComponent) {
  return class ComponentWrapper extends Component {
    state = { isScrolling: false };

    shouldComponentUpdate(nextProps) {
      return WrappedComponent.isSelected(this.props) !== WrappedComponent.isSelected(nextProps);
    }

    componentWillReceiveProps(nextProps) {
      const isScrolling = WrappedComponent.isScrolling(nextProps);
      if (isScrolling && !this.state.isScrolling) {
        this.setState({ isScrolling });
      }
    }

    componentDidMount() {
      this.checkFocus();
    }

    componentDidUpdate() {
      this.checkFocus();
    }

    checkFocus = () => {
      if (WrappedComponent.isSelected(this.props) && this.state.isScrolling) {
        this.focus();
        this.setState({ isScrolling: false });
      }
    }

    focus() {
      ReactDOM.findDOMNode(this).focus();
    }

    render() {
      return <WrappedComponent {...this.props} {...this.state} />;
    }
  };
}
