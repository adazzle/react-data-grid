import React, {PropTypes, Component} from 'react';
import { DropTarget } from 'react-dnd';
import {DragItemTypes} from '../../Constants';
const propTypes = {
  isOver: PropTypes.bool.isRequired,
  connectDropTarget: PropTypes.func,
  canDrop: PropTypes.bool.isRequired,
  groupBy: PropTypes.array,
  noColumnsSelectedMessage: PropTypes.string,
  panelDescription: PropTypes.string
};

const defaultProps = {
  noColumnsSelectedMessage: 'Drag a column header here to group by that column',
  panelDescription: 'Drag a column header here to group by that column'
};


class GroupedColumn extends Component {
  render() {
    let style = {
      width: '80px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    };
    return (<button style={{width: '100px'}} className="btn grouped-col-btn"><span style={style}>{this.props.name}</span>
    <icon className="glyphicon glyphicon-trash" style={{float: 'right'}}></icon></button>);
  }
}

GroupedColumn.propTypes = {
  name: PropTypes.object.isRequired
};

class GroupedColumnsPanel extends Component {
  constructor() {
    super();
  }

  getPanelInstructionMessage() {
    let {groupBy} = this.props;
    return groupBy && groupBy.length > 0 ? this.props.panelDescription : this.props.noColumnsSelectedMessage;
  }

  renderGroupedColumns() {
    return this.props.groupBy.map(c => {
      return (<GroupedColumn name={c}/>);
    });
  }

  renderOverlay(color) {
    return (
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        zIndex: 1,
        opacity: 0.5,
        backgroundColor: color
      }} />
    );
  }

  render() {
    const { connectDropTarget, isOver, canDrop} = this.props;
    return connectDropTarget(
      <div style={{ padding: '2px', position: 'relative', margin: '-10px', display: 'inline-block', border: '1px solid #eee' }}>
        {this.renderGroupedColumns()} <span>{this.getPanelInstructionMessage()}</span>
        {isOver && canDrop && this.renderOverlay('yellow')}
        {!isOver && canDrop && this.renderOverlay('#DBECFA')}
      </div>);
  }
}

GroupedColumnsPanel.defaultProps = defaultProps;
GroupedColumnsPanel.propTypes = propTypes;

const columnTarget = {
  drop(props, monitor) {
    // Obtain the dragged item
    let item = monitor.getItem();
    if (typeof props.onColumnGroupAdded === 'function') {
      props.onColumnGroupAdded(item.key);
    }
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
    draggedolumn: monitor.getItem()
  };
}

export default DropTarget(DragItemTypes.Column, columnTarget, collect)(GroupedColumnsPanel);
