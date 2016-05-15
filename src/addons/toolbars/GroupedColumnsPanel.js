import React, {Component} from 'react';
import { DropTarget } from 'react-dnd';
import {DragItemTypes} from '../../Constants';
const propTypes = {
  isOver: PropTypes.bool.isRequired,
  connectDropTarget: PropTypes.func
};

const defaultProps = {

};

class GroupedColumnsPanel extends Component {
  render() {
    const { connectDropTarget} = this.props;
    return connectDropTarget(
        <div>Drag columns here to enable grouping</div>);
  }
}

GroupedColumnsPanel.defaultProps = defaultProps;
GroupedColumnsPanel.propTypes = propTypes;

const columnTarget = {
  drop(props) {
    console.log(props);
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

export default DropTarget(DragItemTypes.Column, columnTarget, collect)(GroupedColumnsPanel);
