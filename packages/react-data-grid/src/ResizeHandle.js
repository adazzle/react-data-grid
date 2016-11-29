const React          = require('react');
const Draggable      = require('./Draggable');

const ResizeHandle   = React.createClass({
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
