import React, {PropTypes, Component} from 'react';


class RowGroup extends Component {
  render() {
    let treeDepth = this.props.treeDepth || 0;
    let marginLeft = treeDepth * 20;
    return (
      <div className="react-grid-row-group">
        <span style={{float: 'left', marginLeft: marginLeft}} onClick={this.onRowExpand} >{this.props.isExpanded ? String.fromCharCode('9660') : String.fromCharCode('9658')}</span>
        {this.props.columnGroupName} : {this.props.name}
      </div>
    );
  }
}

RowGroup.propTypes = {
  name: PropTypes.string.isRequired,
  columnGroupName: PropTypes.string.isRequired,
  isExpanded: PropTypes.bool.isRequired,
  treeDepth: PropTypes.number.isRequired
};

export default RowGroup;
