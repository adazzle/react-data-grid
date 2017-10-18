const React          = require('react');
const createReactClass = require('create-react-class');
const Draggable      = require('./Draggable');
require('../../../themes/react-data-grid-header.css');

const ResizeHandle   = createReactClass({
  displayName: 'ResizeHandle',

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
