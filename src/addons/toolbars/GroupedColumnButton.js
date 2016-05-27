import React, {PropTypes, Component} from 'react';

export default class GroupedColumnButton extends Component {
  render() {
    let style = {
      width: '80px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    };
    return (<button  className="btn grouped-col-btn btn-sm"><span style={style}>{this.props.name}</span>
    <span className="glyphicon glyphicon-trash" style={{float: 'right', paddingLeft: '5px'}} onClick={this.props.onColumnGroupDeleted.bind(this, this.props.name)}></span></button>);
  }
}

GroupedColumnButton.propTypes = {
  name: PropTypes.object.isRequired,
  onColumnGroupDeleted: PropTypes.func
};
