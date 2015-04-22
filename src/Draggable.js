/* @flow need   */
/**
 * @jsx React.DOM


 */
'use strict';

var React         = require('react');
var PropTypes     = React.PropTypes;
var emptyFunction = require('react/lib/emptyFunction');

var Draggable = React.createClass({

  propTypes: {
    onDragStart: PropTypes.func,
    onDragEnd: PropTypes.func,
    onDrag: PropTypes.func,
    component: PropTypes.oneOfType([PropTypes.func, PropTypes.constructor])
  },

  render(): ?ReactElement {
    var Component = this.props.component;
    return (
      <div {...this.props}  onMouseDown={this.onMouseDown} />
    );
  },

  getDefaultProps() {
    return {
      onDragStart: emptyFunction.thatReturnsTrue,
      onDragEnd: emptyFunction,
      onDrag: emptyFunction
    };
  },

  getInitialState(): {drag: ?any} {
    return {
      drag: null
    };
  },

  onMouseDown(e: SyntheticMouseEvent) {
    var drag = this.props.onDragStart(e);

    if (drag === null && e.button !== 0) {
      return;
    }

    window.addEventListener('mouseup', this.onMouseUp);
    window.addEventListener('mousemove', this.onMouseMove);

    this.setState({drag});
  },

  onMouseMove(e: SyntheticEvent) {
    if (this.state.drag === null) {
      return;
    }

    if (e.stopPropagation) {
      e.stopPropagation();
    }

    if (e.preventDefault) {
      e.preventDefault();
    }

    this.props.onDrag(e);
  },

  onMouseUp(e: SyntheticEvent) {
    this.cleanUp();
    this.props.onDragEnd(e, this.state.drag);
    this.setState({drag: null});
  },

  componentWillUnmount() {
    this.cleanUp();
  },

  cleanUp() {
    window.removeEventListener('mouseup', this.onMouseUp);
    window.removeEventListener('mousemove', this.onMouseMove);
  }
});

module.exports = Draggable;
