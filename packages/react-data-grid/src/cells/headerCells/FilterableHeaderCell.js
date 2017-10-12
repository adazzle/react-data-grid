const React              = require('react');
const PropTypes          = require('prop-types');
const ExcelColumn        = require('../../PropTypeShapes/ExcelColumn');

const FilterableHeaderCell = React.createClass({

  propTypes: {
    onChange: PropTypes.func.isRequired,
    column: PropTypes.shape(ExcelColumn)
  },

  getInitialState(): {filterTerm: string} {
    return {filterTerm: ''};
  },

  handleChange(e: Event) {
    let val = e.target.value;
    this.setState({filterTerm: val });
    this.props.onChange({filterTerm: val, column: this.props.column});
  },

  renderInput: function(): ?ReactElement {
    if (this.props.column.filterable === false) {
      return <span/>;
    }

    let inputKey = 'header-filter-' + this.props.column.key;
    return (<input key={inputKey} type="text" className="form-control input-sm" placeholder="Search" value={this.state.filterTerm} onChange={this.handleChange}/>);
  },

  render: function(): ?ReactElement {
    return (
      <div>
        <div className="form-group">
          {this.renderInput()}
        </div>
      </div>
    );
  }
});

module.exports = FilterableHeaderCell;
