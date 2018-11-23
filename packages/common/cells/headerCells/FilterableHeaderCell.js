import React from 'react';
import Column from 'common/prop-shapes/Column';
import PropTypes from 'prop-types';

class FilterableHeaderCell extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    column: PropTypes.shape(Column)
  };

  state = {filterTerm: ''};

  handleChange = (e) => {
    let val = e.target.value;
    this.setState({filterTerm: val });
    this.props.onChange({filterTerm: val, column: this.props.column});
  };

  renderInput = () => {
    if (this.props.column.filterable === false) {
      return <span/>;
    }

    let inputKey = 'header-filter-' + this.props.column.key;
    return (<input key={inputKey} type="text" className="form-control input-sm" placeholder="Search" value={this.state.filterTerm} onChange={this.handleChange}/>);
  };

  render() {
    return (
      <div>
        <div className="form-group">
          {this.renderInput()}
        </div>
      </div>
    );
  }
}

module.exports = FilterableHeaderCell;
