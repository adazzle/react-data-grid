import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import joinClasses from 'classnames';
import ExcelColumn from './PropTypeShapes/ExcelColumn';
import ResizeHandle from './ResizeHandle';

class SummaryCell extends Component {
  static propTypes = {
    renderer: PropTypes.oneOfType([PropTypes.func, PropTypes.element]).isRequired,
    column: PropTypes.shape(ExcelColumn).isRequired,
    onResize: PropTypes.func.isRequired,
    height: PropTypes.number.isRequired,
    onResizeEnd: PropTypes.func.isRequired,
    className: PropTypes.string
  };

  state: {resizing: boolean} = {resizing: false};

  getStyle = (): {width:number; left: number; display: string; position: string; overflow: string; height: number; margin: number; textOverflow: string; whiteSpace: string } => {
    return {
      width: this.props.column.width,
      left: this.props.column.left,
      display: 'inline-block',
      position: 'absolute',
      height: this.props.height,
      margin: 0,
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    };
  };

  setScrollLeft = (scrollLeft: number) => {
    const node = ReactDOM.findDOMNode(this);
    node.style.webkitTransform = `translate3d(${scrollLeft}px, 0px, 0px)`;
    node.style.transform = `translate3d(${scrollLeft}px, 0px, 0px)`;
  };

  removeScroll = () => {
    const node = ReactDOM.findDOMNode(this);
    if (node) {
      const transform = 'none';
      node.style.webkitTransform = transform;
      node.style.transform = transform;
    }
  };

  render(): ?ReactElement {
    let resizeHandle;
    if (this.props.column.resizable) {
      resizeHandle = (<ResizeHandle />);
    }
    let className = joinClasses({
      'react-grid-HeaderCell': true,
      'react-grid-HeaderCell--resizing': this.state.resizing,
      'react-grid-HeaderCell--locked': this.props.column.locked
    });
    className = joinClasses(className, this.props.className, this.props.column.cellClass);
    let cell = this.getCell();
    return (
      <div className={className} style={this.getStyle()}>
        {cell}
        {resizeHandle}
      </div>
    );
  }
}

export default SummaryCell;
