/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const focusableComponentWrapper = WrappedComponent => {
  return (
    class ComponentWrapper extends Component {
      constructor() {
        super();
        this.checkFocus = this.checkFocus.bind(this);
      }

      shouldComponentUpdate(nextProps) {
        return WrappedComponent.isSelected(this.props) !== WrappedComponent.isSelected(nextProps);
      }

      componentDidMount() {
        this.checkFocus();
      }

      componentDidUpdate() {
        this.checkFocus();
      }

      checkFocus() {
        if (WrappedComponent.isSelected(this.props) && WrappedComponent.isScrolling(this.props)) {
          this.focus();
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
