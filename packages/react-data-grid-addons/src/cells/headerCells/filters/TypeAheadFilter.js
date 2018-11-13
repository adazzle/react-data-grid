import './ReactSelectStyles.css';
import './TypeAheadFilterStyles.css'
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import AsyncSelect from 'react-select/lib/Async';
import { utils, shapes } from 'react-data-grid';
import {isEmptyArray} from 'common/utils';
const { ExcelColumn } = shapes; 
const MultiValueLabel = props => {
    return (
        <div>
            <div>{props.data.label}</div>
        </div>
    );
};

const SingleValue = props => {
    return (
        <div>
            <div>{props.data.label}</div>
        </div>
    );
};

class TypeAheadFilter extends React.Component {
    constructor(props) {
        super(props);
        this.getOptions = this.getOptions.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.filterValues = this.filterValues.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.columnValueContainsSearchTerms = this.columnValueContainsSearchTerms.bind(this);
        this.getOptionsTemplateForFilter = this.getOptionsTemplateForFilter.bind(this);
        let defaultFilters = props.column ? props.column.filterValue : []
        this.state = { options: [], rawValue: '', placeholder: 'Begin typing and select from list', filters: defaultFilters };
    }

    componentWillReceiveProps(newProps) {
        this.setState({ filters: newProps.column.filterValue });
    }

    columnValueContainsSearchTerms(columnValue, filterTermValue) {
        if (columnValue !== undefined && filterTermValue !== undefined) {
            let strColumnValue = columnValue.toString();
            let strFilterTermValue = filterTermValue.toString();
            let checkValueIndex = strColumnValue.trim().toLowerCase().indexOf(strFilterTermValue.trim().toLowerCase());
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

    getOptions(searchText, event, newProps) {
        var parentScope = this;
        return this.props.getValidFilterValuesForTypeAhead(this.props.column, searchText).then(function (val) {
            parentScope.setState({ options: val });
            return val;
        });
    }

    handleChange(value) {
        let filters = value;
        this.setState({ filters });
        this.props.onChange({ filterTerm: filters, column: this.props.column, rawValue: value, filterValues: this.filterValues });
    }

    handleInputChange (newValue) {
        const inputValue = newValue.replace(/\W/g, "");
        this.setState({ inputValue });
        return inputValue;
      };

      getOptionsTemplateForFilter(option){
        return this.props.getOptionsTemplateForFilter(option, this.props.column); 
      }

    render() {
        return this.props.useTemplatingForTypeaheadFilter ? 
        <AsyncSelect
          isMulti={this.props.isMultiSelection}
          placeholder = {"Begin typing and select from list"}
          ref={grid => (this.grid = grid)}
          cacheOptions
          loadOptions={this.getOptions}
          value={this.state.filters}
          name={`filter-${this.props.column.key}`}
          defaultOptions
          cacheOptions
          onInputChange={this.handleInputChange}
          getOptionLabel={this.getOptionsTemplateForFilter}
          getOptionValue={this.props.getOptionValueForFilter}
          isClearable={this.props.isTypeaheadFilterClearable}
          onChange={this.handleChange}
          components={{ MultiValueLabel , SingleValue }}
        />
         : 
         <AsyncSelect
          isMulti={this.props.isMultiSelection ? this.props.isMultiSelection : true}
          placeholder = {"Begin typing and select from list"}
          ref={grid => (this.grid = grid)}
          cacheOptions
          loadOptions={this.getOptions}
          value={this.state.filters}
          name={`filter-${this.props.column.key}`}
          defaultOptions
          cacheOptions
          onInputChange={this.handleInputChange}
          isClearable={this.props.isTypeaheadFilterClearable ? this.props.isTypeaheadFilterClearable : true}
          onChange={this.handleChange}
          components={{ MultiValueLabel , SingleValue }}
        />
         ;
    }
}

TypeAheadFilter.propTypes = {
    onChange: PropTypes.func.isRequired,
    column: PropTypes.shape(ExcelColumn),
    getValidFilterValuesForTypeAhead: PropTypes.func,
    isMultiSelection: PropTypes.bool,
    useTemplatingForTypeaheadFilter: PropTypes.bool,
    isTypeaheadFilterClearable: PropTypes.bool,
    getOptionsTemplateForFilter: PropTypes.func,
    getOptionValueForFilter: PropTypes.func
};

export default TypeAheadFilter;