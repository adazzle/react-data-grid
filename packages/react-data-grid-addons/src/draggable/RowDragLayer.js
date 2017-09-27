import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { DragLayer } from 'react-dnd';
import Selectors from '../data/Selectors';
import '../../../../themes/react-data-grid-cell.css';
import '../../../../themes/react-data-grid-row.css';

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
    transform: transform,
    WebkitTransform: transform
  };
}

class CustomDragLayer extends Component {

  isDraggedRowSelected(selectedRows) {
    let {item, rowSelection} = this.props;
    if (selectedRows && selectedRows.length > 0) {
      let key = rowSelection.selectBy.keys.rowKey;
      return selectedRows.filter(r => r[key] === item.data[key]).length > 0;
    }
    return false;
  }

  getDraggedRows() {
    let draggedRows;
    let {rowSelection} = this.props;
    if (rowSelection && rowSelection.selectBy.keys) {
      let rows = this.props.rows;
      let {rowKey, values} = rowSelection.selectBy.keys;
      let selectedRows = Selectors.getSelectedRowsByKey({rowKey: rowKey, selectedKeys: values, rows: rows});
      draggedRows = this.isDraggedRowSelected(selectedRows) ? selectedRows : [this.props.rows[this.props.item.idx]];
    } else {
      draggedRows = [this.props.rows[this.props.item.idx]];
    }
    return draggedRows;
  }

  renderDraggedRows() {
    const columns = this.props.columns;
    return this.getDraggedRows().map((r, i) => {
      return <tr key={`dragged-row-${i}`}>{this.renderDraggedCells(r, i, columns) }</tr>;
    });
  }

  renderDraggedCells(item, rowIdx, columns) {
    let cells = [];
    if (item != null) {
      columns.forEach( c => {
        if (item.hasOwnProperty(c.key)) {
          if (c.formatter) {
            const Formatter = c.formatter;
            const dependentValues = typeof c.getRowMetaData === 'function' ? c.getRowMetaData(item, c) : {};
            cells.push(<td key={`dragged-cell-${rowIdx}-${c.key}`} className="react-grid-Cell" style={{padding: '5px'}}><Formatter dependentValues={dependentValues} value={item[c.key]} /></td>);
          } else {
            cells.push(<td key={`dragged-cell-${rowIdx}-${c.key}`} className="react-grid-Cell" style={{padding: '5px'}}>{item[c.key]}</td>);
          }
        }
      });
    }
    return cells;
  }

  render() {
    const { isDragging} = this.props;
    if (!isDragging) {
      return null;
    }
    let draggedRows = this.renderDraggedRows();
    return (
      <div style={layerStyles} className="rdg-dragging">
        <div style={getItemStyles(this.props) } className="rdg-dragging">
          <table><tbody>{draggedRows}</tbody></table>
        </div>
      </div>
    );
  }
}

CustomDragLayer.propTypes = {
  item: PropTypes.object,
  itemType: PropTypes.string,
  currentOffset: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  }),
  isDragging: PropTypes.bool.isRequired,
  rowSelection: PropTypes.object,
  rows: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired
};

function collect(monitor) {
  return {
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging()
  };
}

export default DragLayer(collect)(CustomDragLayer);
