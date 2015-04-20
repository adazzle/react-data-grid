/* TODO@flow unkwon */
/**
 * @jsx React.DOM


 */
"use strict";

var React          = require('react');
var joinClasses     = require('classnames');
var cloneWithProps = require('react/lib/cloneWithProps');
var PropTypes      = React.PropTypes;
var ExcelColumn    = require('./addons/grids/ExcelColumn');
var ResizeHandle   = require('./ResizeHandle');

var HeaderCell = React.createClass({

  propTypes: {
    renderer: PropTypes.oneOfType([PropTypes.func, PropTypes.element]).isRequired,
    column: PropTypes.shape(ExcelColumn).isRequired,
    onResize: PropTypes.func.isRequired,
    height : PropTypes.number.isRequired
  },

  render(): ?ReactElement {
    var resizeHandle;
    if(this.props.column.resizeable){
      resizeHandle = <ResizeHandle
      onDrag={this.onDrag}
      onDragStart={this.onDragStart}
      onDragEnd={this.onDragEnd}
      />
    }
    var className = joinClasses({
      'react-grid-HeaderCell': true,
      'react-grid-HeaderCell--resizing': this.state.resizing,
      'react-grid-HeaderCell--locked': this.props.column.locked
    });
    className = joinClasses(className, this.props.className);
    var cell = this.getCell();
    return (
      <div className={className} style={this.getStyle()}>
        {cell}
        {{resizeHandle}}
      </div>
    );
  },

  getCell(): ReactComponent {
    if (React.isValidElement(this.props.renderer)) {
      return cloneWithProps(this.props.renderer, {column : this.props.column});
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
