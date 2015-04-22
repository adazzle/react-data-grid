var React          = require('react');
var joinClasses     = require('classnames');
var Draggable      = require('./Draggable');
var cloneWithProps = require('react/lib/cloneWithProps');
var PropTypes      = React.PropTypes;

var ResizeHandle   = React.createClass({

  style: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 6,
    height: '100%'
  },

  render(): ?ReactElement {
    return (
      <Draggable {...this.props}
      className="react-grid-HeaderCell__resizeHandle"
      style={this.style}
      />
  );
  }
});

module.exports = ResizeHandle;
