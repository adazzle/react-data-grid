/* TODO@flow unkwon */
/**
 * @jsx React.DOM


 */
"use strict";

var React       = require('react/addons');
var cx          = React.addons.classSet;
var Draggable   = require('./Draggable');
var PropTypes   = React.PropTypes;
var ExcelColumn = require('./addons/grids/ExcelColumn');
var ResizeHandle = React.createClass({

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

var HeaderCell = React.createClass({

  propTypes: {
    renderer: PropTypes.oneOfType([PropTypes.func, PropTypes.element]).isRequired,
    column: PropTypes.shape(ExcelColumn).isRequired,
    onResize: PropTypes.func
  },

  render(): ?ReactElement {
    var className = cx({
      'react-grid-HeaderCell': true,
      'react-grid-HeaderCell--resizing': this.state.resizing,
      'react-grid-HeaderCell--locked': this.props.column.locked
    });
    className = cx(className, this.props.className);
    var cell = this.getCell();
    return (
      <div className={className} style={this.getStyle()}>
        {cell}
        {this.props.column.resizeable ?
          <ResizeHandle
            onDrag={this.onDrag}
            onDragStart={this.onDragStart}
            onDragEnd={this.onDragEnd}
            /> :
          null}
      </div>
    );
  },

  getCell(): ReactComponent {
    if (React.isValidElement(this.props.renderer)) {
      return React.addons.cloneWithProps(this.props.renderer, {column : this.props.column});
    } else {
      return this.props.renderer({column: this.props.column});
    }
  },

  getDefaultProps(): {renderer: ReactComponent | (props: {column: {name: string}}) => ReactElement} {
    return {
      renderer: simpleCellRenderer
    };
  },

  getInitialState(): {resizing: boolean} {
    return {resizing: false};
  },

  setScrollLeft(scrollLeft: number) {
    var node = this.getDOMNode();
    node.style.webkitTransform = `translate3d(${scrollLeft}px, 0px, 0px)`;
    node.style.transform = `translate3d(${scrollLeft}px, 0px, 0px)`;
  },

  getStyle(): {width:number; left: number; display: string; position: string; overflow: string; height: number; margin: number; textOverflow: string; whiteSpace: string } {
    return {
      width: this.props.column.width,
      left: this.props.column.left,
      display: 'inline-block',
      position: 'absolute',
      overflow: 'hidden',
      height: this.props.height,
      margin: 0,
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    };
  },

  onDragStart() {
    this.setState({resizing: true});
  },

  onDrag(e: SyntheticMouseEvent) {
    var resize = this.props.onResize || null; //for flows sake, doesnt recognise a null check direct
    if(resize) {
      var width = this.getWidthFromMouseEvent(e);
      if (width > 0) {
        resize(this.props.column, width);
      }
    }
  },

  onDragEnd(e: SyntheticMouseEvent) {
    var width = this.getWidthFromMouseEvent(e);
    this.props.onResizeEnd(this.props.column, width);
    this.setState({resizing: false});
  },

  getWidthFromMouseEvent(e: SyntheticMouseEvent): number {
    var right = e.pageX;
    var left = this.getDOMNode().getBoundingClientRect().left;
    return right - left;
  }
});

function simpleCellRenderer(props: {column: {name: string}}): ReactElement {
  return <div className="widget-HeaderCell__value">{props.column.name}</div>;
}

module.exports = HeaderCell;
