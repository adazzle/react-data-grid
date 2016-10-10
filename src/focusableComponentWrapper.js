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
        return this.isSelected() !== this.isSelected(nextProps);
      }

      componentDidMount() {
        this.checkFocus();
      }

      componentDidUpdate() {
        this.checkFocus();
      }

      isSelected() { }

      checkFocus() {
        if (this.isSelected() && this.props.cellMetaData.isScrollingVerticallyWithKeyboard) {
          ReactDOM.findDOMNode(this).focus();
        }
      }

      render() {
        return <WrappedComponent {...this.props} {...this.state} />;
      }
    });
};

export default focusableComponentWrapper;
