import React, {Component} from 'react';

const propTypes = {

};

const defaultProps = {
};

class GroupedColumnsPanel extends Component {
  render() {
    return (
        <div>Drag columns here to enable grouping</div>);
  }
}

GroupedColumnsPanel.defaultProps = defaultProps;
GroupedColumnsPanel.propTypes = propTypes;

export default GroupedColumnsPanel;
