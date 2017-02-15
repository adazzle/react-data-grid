/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const focusableComponentWrapper = WrappedComponent => {
  return (
    class ComponentWrapper extends Component {
      constructor() {
        super();
        this.checkFocus = this.checkFocus.bind(this);
        this.state = { isScrolling: false };
      }

      shouldComponentUpdate(nextProps) {
        return WrappedComponent.isSelected(this.props) !== WrappedComponent.isSelected(nextProps);
      }

      componentWillReceiveProps(nextProps) {
        let isScrolling = WrappedComponent.isScrolling(nextProps);
        if (isScrolling && !this.state.isScrolling) {
          this.setState({isScrolling: isScrolling});
        }
      }

      componentDidMount() {
        this.checkFocus();
      }

      componentDidUpdate() {
        this.checkFocus();
      }

      checkFocus() {
        if (WrappedComponent.isSelected(this.props) && this.state.isScrolling) {
          this.focus();
          this.setState({isScrolling: false});
        }
      }

      focus() {
        ReactDOM.findDOMNode(this).focus();
      }

      render() {
        return <WrappedComponent {...this.props} {...this.state} />;
      }
    });
};

export default focusableComponentWrapper;
