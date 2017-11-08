import React, {Component} from 'react';
import PropTypes from 'prop-types';


export default class GroupedColumnButton extends Component {
  render() {
    let style = {
      width: '80px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    };
    return (
      <button  className="btn grouped-col-btn btn-sm"><span style={style}>{this.props.name}</span>
        <span
          className="glyphicon glyphicon-trash"
          style={{float: 'right', paddingLeft: '5px'}}
          onClick={this.props.onColumnGroupDeleted.bind(null, this.props.columnKey)}>
        </span>
      </button>
    );
  }
}

GroupedColumnButton.propTypes = {
  name: PropTypes.string.isRequired,
  onColumnGroupDeleted: PropTypes.func,
  columnKey: PropTypes.string.isRequired
};
