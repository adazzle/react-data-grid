import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

import { isEmptyArray } from '../../../utils';

export default class AutoCompleteFilter extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    // column: PropTypes.shape(shapes.Column),
    getValidFilterValues: PropTypes.func,
    multiSelection: PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.getOptions = this.getOptions.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.filterValues = this.filterValues.bind(this);
    this.state = { options: this.getOptions(), rawValue: '', placeholder: 'Search' };
  }

  // FIXME
  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps(newProps) {
    this.setState({ options: this.getOptions(newProps) });
  }

  getOptions(newProps) {
    const props = newProps || this.props;
    let options = props.getValidFilterValues(props.column.key);
    options = options.map(o => {
      if (typeof o === 'string') {
        return { value: o, label: o };
      }
      return o;
    });
    return options;
  }

  columnValueContainsSearchTerms(columnValue, filterTermValue) {
    if (columnValue !== undefined && filterTermValue !== undefined) {
      const strColumnValue = columnValue.toString();
      const strFilterTermValue = filterTermValue.toString();
      const checkValueIndex = strColumnValue.trim().toLowerCase().indexOf(strFilterTermValue.trim().toLowerCase());
      return checkValueIndex !== -1 && (checkValueIndex !== 0 || strColumnValue === strFilterTermValue);
    }
    return false;
  }

  filterValues(row, columnFilter, columnKey) {
    let include = true;
    if (columnFilter === null) {
      include = false;
    } else if (columnFilter.filterTerm && !isEmptyArray(columnFilter.filterTerm)) {
      if (columnFilter.filterTerm.length) {
        include = columnFilter.filterTerm.some(filterTerm => {
          return this.columnValueContainsSearchTerms(row[columnKey], filterTerm.value) === true;
        });
      } else {
        include = this.columnValueContainsSearchTerms(row[columnKey], columnFilter.filterTerm.value);
      }
    }
    return include;
  }

  handleChange(value) {
    const filters = value;
    this.setState({ filters });
    this.props.onChange({ filterTerm: filters, column: this.props.column, rawValue: value, filterValues: this.filterValues });
  }

  render() {
    return (
      <Select
        autosize={false}
        name={`filter-${this.props.column.key}`}
        options={this.state.options}
        placeholder={this.state.placeholder}
        onChange={this.handleChange}
        escapeClearsValue
        multi={this.props.multiSelection !== undefined && this.props.multiSelection !== null ? this.props.multiSelection : true}
        value={this.state.filters}
      />
    );
  }
}
