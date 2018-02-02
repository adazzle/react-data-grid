import React, { Component, PropTypes } from 'react';
import joinClasses from 'classnames';
import Dropdown, { DropdownBody, DropdownHeader, DropdownToggle } from './Dropdown';
import DropdownSearch from './DropdownSearch';
import { utils, shapes } from 'react-data-grid';
import '../../../../../../../themes/yaf-addon.css';

const { isEmptyArray } = utils;
const { ExcelColumn } = shapes;
const Types = Object.freeze({
  TEXT: Symbol('text'),
  NUMBER: Symbol('number'),
  DATE: Symbol('date')
});

export default class YafFilter extends Component {
  state = {
    options: [],
    selected: [],
    hasFilter: false
  }

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    column: PropTypes.shape(ExcelColumn),
    getValidFilterValues: PropTypes.func
  };

  onOpen = () => {
    this.setState({ options: this.getOptions() });
  }

  onConfirm = () => {
    const { selected } = this.state;
    this.setState({ hasFilter: this.hasFilter() });
    this.props.onChange({
      filterTerm: selected,
      column: this.props.column,
      rawValue: selected,
      filterValues: this.filterValues
    });
  };

  getOptions = (newProps) => {
    const props = newProps || this.props;
    let options = props.getValidFilterValues(props.column.key);
    options = options.map((o) => {
      if (typeof o === 'string') {
        return { value: o, label: o };
      }
      if (typeof o === 'number') {
        return { value: o, label: `${o}` };
      }
      return { value: null, label: '' };
    });
    options.push({ value: '__selectall__', label: 'SELECT ALL' });
    if (props.column.type === Types.NUMBER) {
      options.sort(this.compareNumber);
    } else {
      options.sort(this.compareText);
    }
    return options;
  }

  compareText = (a, b) => {
    const valueA = a.value;
    const valueB = b.value;
    if (valueA === '__selectall__') {
      return -1;
    }
    if (valueB === '__selectall__') {
      return 1;
    }
    if (valueA < valueB) {
      return -1;
    }
    if (valueA > valueB) {
      return 1;
    }
    return 0;
  }

  compareNumber = (a, b) => {
    const valueA = a.value;
    const valueB = b.value;
    if (valueA === '__selectall__') {
      return -1;
    }
    if (valueB === '__selectall__') {
      return 1;
    }
    return valueA - valueB;
  }

  filterValues = (row, columnFilter, columnKey) => {
    const value = row[columnKey];
    if (columnFilter === null) {
      return false;
    }
    if (!isEmptyArray(columnFilter.filterTerm)) {
      return columnFilter.filterTerm.some((filterTerm) => {
        return filterTerm === value;
      });
    }
    return true;
  }

  addOption = (e, item) => {
    const newSelected = [...this.state.selected, item.value];
    this.setState({ selected: newSelected });
  };

  removeOption = (e, item) => {
    const newSelected = this.state.selected.filter(x => x !== item.value);
    this.setState({ selected: newSelected });
  };

  selectAll = (isUsing) => {
    if (isUsing) {
      this.setState({ selected: [] });
    } else {
      const options = this.state.options.map(o => o.value);
      this.setState({ selected: options });
    }
  }

  isUsingOption = (item) => {
    return this.state.selected.some(s => s === item.value);
  };

  toggleOption = (e, isUsing, item) => {
    if (item.value === '__selectall__') {
      this.selectAll(isUsing);
    } else if (isUsing) {
      this.removeOption(e, item);
    } else {
      this.addOption(e, item);
    }
  };

  hasFilter = () => {
    const { advancedFilter, advancedFilters, selected } = this.state;
    return (!advancedFilter && selected.length > 0) ||
      (advancedFilter && advancedFilters.some(x => x.advancedFilterValue));
  }

  renderDropdownItem = (item) => {
    const isUsing = this.isUsingOption(item);
    return (
      <a
        className={isUsing ? 'is-active' : ''}
        onClick={e => this.toggleOption(e, isUsing, item)}
      >
        {item.label}
      </a>
    );
  };

  renderHeaderTitle = () => {
    return (
      <div>Filter</div>
    );
  };

  renderDropdownWithItems = () => {
    return (
      <DropdownSearch
        placeholder="Pesquisar"
        filterKeys={['value']}
        data={this.state.options}
      >
        <DropdownBody renderItem={this.renderDropdownItem} />
      </DropdownSearch>
    );
  }

  render() {
    const { hasFilter } = this.state;
    const className = joinClasses({
      'fa fa-filter': !hasFilter,
      'fa fa-filter-active': hasFilter
    });

    return (
      <Dropdown
        onShowDropdown={this.onOpen}
        onConfirm={this.onConfirm}
      >
        <DropdownToggle className="box-control">
          <span className="icon">
            <i className={className} aria-hidden="true" />
          </span>
        </DropdownToggle>
        <DropdownHeader>
          {this.renderHeaderTitle()}
        </DropdownHeader>
        {this.renderDropdownWithItems()}
      </Dropdown>
    );
  }
}
