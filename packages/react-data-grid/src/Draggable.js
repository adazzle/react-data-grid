const React         = require('react');
const PropTypes     = require('prop-types');
const createObjectWithProperties = require('./createObjectWithProperties');
require('../../../themes/react-data-grid-header.css');

// The list of the propTypes that we want to include in the Draggable div
const knownDivPropertyKeys = ['onDragStart', 'onDragEnd', 'onDrag', 'style'];

const Draggable = React.createClass({
  propTypes: {
    onDragStart: PropTypes.func,
    onDragEnd: PropTypes.func,
    onDrag: PropTypes.func,
    component: PropTypes.oneOfType([PropTypes.func, PropTypes.constructor]),
    style: PropTypes.object
  },

  getDefaultProps() {
    return {
      onDragStart: () => true,
      onDragEnd: () => {},
      onDrag: () => {}
    };
  },

  getInitialState(): {drag: ?any} {
    return {
      drag: null
    };
  },

  componentWillUnmount() {
    this.cleanUp();
  },

  onMouseDown(e: SyntheticMouseEvent) {
    let drag = this.props.onDragStart(e);

    if (drag === null && e.button !== 0) {
      return;
    }

    window.addEventListener('mouseup', this.onMouseUp);
    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('touchend', this.onMouseUp);
    window.addEventListener('touchmove', this.onMouseMove);

    this.setState({drag});
  },

  onMouseMove(e: SyntheticEvent) {
    if (this.state.drag === null) {
      return;
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

  cleanUp() {
    window.removeEventListener('mouseup', this.onMouseUp);
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('touchend', this.onMouseUp);
    window.removeEventListener('touchmove', this.onMouseMove);
  },

  getKnownDivProps() {
    return createObjectWithProperties(this.props, knownDivPropertyKeys);
  },

  render(): ?ReactElement {
    return (
      <div {...this.getKnownDivProps()}
        onMouseDown={this.onMouseDown}
        onTouchStart={this.onMouseDown}
        className="react-grid-HeaderCell__draggable" />
    );
  }
});

module.exports = Draggable;
