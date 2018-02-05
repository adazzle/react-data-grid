import React, { Component, PropTypes } from 'react';
import debounce from 'lodash/fp/debounce';
import isFunction from 'lodash/fp/isFunction';
import { DropdownBody } from './Dropdown';
import Immutable from 'immutable';

/* TODO move to a shared folder */
const toImmutableList = (data) => {
  if (!data) {
    return new Immutable.List();
  }
  if (Array.isArray(data)) {
    return Immutable.List.of(...data);
  }
  return data;
};

export default class DropdownSearch extends Component {
  constructor(props) {
    super(props);
    const data = toImmutableList(props.data).valueSeq();
    this.state = { filterText: '', filteredData: data };
    this.filterData = debounce(100, this.filterData.bind(this, data));
  }

  static propTypes = {
    data: PropTypes.array,
    filterKeys: PropTypes.array,
    placeholder: PropTypes.string,
    children: PropTypes.element
  };

  filter = (paramItem, filterText, keys) => {
    const item = isFunction(paramItem.toJS) ? paramItem.toJS() : paramItem;
    const filtered = keys.filter(key => (`${item[key]}`).toLowerCase().indexOf(filterText.toLowerCase()) >= 0);
    return filtered && filtered.length;
  }

  filterData = (data) => {
    const filterKeys = this.props.filterKeys || ['text'];
    const newData = data.filter(item =>
      this.filter(item, this.state.filterText, filterKeys));
    this.setState({ filteredData: newData });
  }

  handleChange = (evt) => {
    this.setState({ filterText: evt.target.value });
    this.filterData(evt.target.value);
  }

  render() {
    const placeholder = this.props.placeholder || 'Search';
    const childrens = React.Children.map(this.props.children, (child) => {
      if (child.type === DropdownBody) {
        return React.cloneElement(child, { data: this.state.filteredData });
      }
      return child;
    });
    return (
      <div className="dropdown-portal-search">
        <div className="search-input">
          <input
            className="form-control"
            type="text"
            placeholder={placeholder}
            value={this.state.filterText}
            onChange={this.handleChange}
          />
        </div>
        {childrens}
      </div>
    );
  }
}
