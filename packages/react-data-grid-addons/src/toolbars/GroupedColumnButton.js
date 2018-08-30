import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class GroupedColumnButton extends Component {
  render() {
    return (
      <div className="grouped-col-btn btn btn-sm">
        <span className="grouped-col-btn__name">{this.props.name}</span>
        <span className="grouped-col-btn__remove glyphicon glyphicon-trash"
              onClick={this.props.onColumnGroupDeleted.bind(null, this.props.columnKey)} />
      </div>
    );
  }
}

GroupedColumnButton.propTypes = {
  name: PropTypes.string.isRequired,
  onColumnGroupDeleted: PropTypes.func,
  columnKey: PropTypes.string.isRequired
};
