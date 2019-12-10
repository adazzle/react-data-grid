import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragLayer } from 'react-dnd';

const layerStyles = {
  cursor: '-webkit-grabbing',
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%'
};

function getItemStyles(props) {
  const { currentOffset } = props;
  if (!currentOffset) {
    return {
      display: 'none'
    };
  }

  const { x, y } = currentOffset;
  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
    WebkitTransform: transform
  };
}

class CustomDragLayer extends Component {
  static propTypes = {
    item: PropTypes.object,
    itemType: PropTypes.string,
    currentOffset: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired
    }),
    isDragging: PropTypes.bool.isRequired,
    selectedRows: PropTypes.object,
    rows: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired
  };

  getDraggedRows() {
    let draggedRows;
    const { selectedRows } = this.props;
    if (selectedRows && selectedRows.size > 0) {
      draggedRows = [...selectedRows];
    } else {
      draggedRows = [this.props.rows[this.props.item.idx]];
    }
    return draggedRows;
  }

  renderDraggedRows() {
    const { columns } = this.props;
    return this.getDraggedRows().map((r, i) => {
      return <tr key={`dragged-row-${i}`}>{this.renderDraggedCells(r, i, columns) }</tr>;
    });
  }

  renderDraggedCells(item, rowIdx, columns) {
    const cells = [];
    if (item != null) {
      columns.forEach(c => {
        if (item.hasOwnProperty(c.key)) {
          if (c.formatter) {
            const Formatter = c.formatter;
            const dependentValues = typeof c.getRowMetaData === 'function' ? c.getRowMetaData(item, c) : {};
            cells.push(<td key={`dragged-cell-${rowIdx}-${c.key}`} className="rdg-cell" style={{ padding: '5px' }}><Formatter dependentValues={dependentValues} value={item[c.key]} /></td>);
          } else {
            cells.push(<td key={`dragged-cell-${rowIdx}-${c.key}`} className="rdg-cell" style={{ padding: '5px' }}>{item[c.key]}</td>);
          }
        }
      });
    }
    return cells;
  }

  render() {
    const { isDragging } = this.props;
    if (!isDragging) {
      return null;
    }
    const draggedRows = this.renderDraggedRows();
    return (
      <div style={layerStyles} className="rdg-dragging">
        <div style={getItemStyles(this.props)} className="rdg-dragging">
          <table><tbody>{draggedRows}</tbody></table>
        </div>
      </div>
    );
  }
}

function collect(monitor) {
  return {
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging()
  };
}

export default DragLayer(collect)(CustomDragLayer);
