import React from 'react';
import { shapes } from 'react-data-grid';
const { ExcelColumn } = shapes;


class DateFilter extends React.Component {
  /** Allows a user to search a column by date
   *  based on react-data-grid-additions' NumericFilter
   *  react-data-grid/packages/react-data-grid-addons/src/cells/headerCells/filters/NumericFilter.js
   *
   *  Assumptions:
   *  All incoming dates are UTC
   *  User wantes to search in local time zone, NOT UTC
   */

  static RuleType = {
    on: {
      title: 'On',
      key: 'eq'
    },
    beginning: {
      title: 'Beginning',
      key: 'gte'
    },
    ending: {
      title: 'Ending',
      key: 'lte'
    },
    between: {
      title: 'Including',
      keys: ['lte', 'gte']
    }
  };

  constructor(props) {
    super(props);

    this.convertDateToUTC = this.convertDateToUTC.bind(this);
    this.filterValues = this.filterValues.bind(this);
    this.getRules = this.getRules.bind(this);
    this.setProps = this.setProps.bind(this);
    this.leftChange = this.leftChange.bind(this);
    this.rightChange = this.rightChange.bind(this);
    this.setSearchType = this.setSearchType.bind(this);
    this.inputGen = this.inputGen.bind(this);

    this.comp = {
      sortState: 'on',
      left: null,
      right: null
    };
  }

  convertDateToUTC(date) {
    // returns the date in the local timezone, but with the UTC literal date values

    // make 'date' a Date
    let dateObj = typeof date === 'string' ? new Date(date) : date;

    return new Date(dateObj.getUTCFullYear(), dateObj.getUTCMonth(), dateObj.getUTCDate(),
                    dateObj.getUTCHours(), dateObj.getUTCMinutes(), dateObj.getUTCSeconds());
  }

  filterValues(row, columnFilter, columnKey) {
    if (columnFilter.filterTerm == null) { return true; }

    // implement default filter logic
    let value = new Date(row[columnKey]);
    for (let rule of columnFilter.filterTerm) {
      if (rule.hasOwnProperty('eq')) {
        if (!(rule.eq.toLocaleDateString() === value.toLocaleDateString())) { return false; }
      }
      if (rule.hasOwnProperty('lte')) {
        if (rule.lte.getTime() < value.getTime()) { return false; }
      }
      if (rule.hasOwnProperty('gte')) {
        if (rule.gte.getTime() > value.getTime()) { return false; }
      }
    }
    return true;
  }

  getRules() {
    let rules = [];
    if (!this.comp.left || this.comp.sortState === 'between' && !this.comp.right) {
      return rules;
    }

    let key = DateFilter.RuleType[this.comp.sortState].key;

    switch (this.comp.sortState) {
    case 'on':
    case 'ending':
    case 'beginning':
      rules.push({type: this.comp.sortState, [key]: this.comp.left});
      break;
    case 'between':
      rules.push({type: this.comp.sortState, lte: this.comp.right});
      rules.push({type: this.comp.sortState, gte: this.comp.left});
      break;
    default:
      break;
    }
    return rules;
  }

  setProps() {
    let filters = this.getRules();
    this.props.onChange({
      filterTerm: (filters.length > 0 ? filters : null),
      column: this.props.column,
      left: this.comp.left,
      right: this.comp.right,
      filterValues: this.filterValues
    });
  }

  leftChange(event) {
    // Convert the UTC date created by the value to a time-shifted value.
    // Should probably be considered a hack, but this is what a user is likely to mean
    this.comp.left = this.convertDateToUTC(event.target.value);
    this.setProps();
  }

  rightChange(event) {
    // see leftChange
    this.comp.right = this.convertDateToUTC(event.target.value);
    this.setProps();
  }

  setSearchType(event) {
    this.comp.sortState = event.target.value;
    this.setProps();
  }

  inputGen(key, blockStyle, changeHandler, type = 'date') {
    return (
        <input key={key}
               style={blockStyle}
               type={type}
               className="form-control input-sm"
               onChange={changeHandler} />);
  }

  render() {
    let inputKey = 'header-filter-' + this.props.column.key;

    let fullBlockStyle = {
      maxWidth: '100%',
      display: 'inline-block'
    };
    let halfBlockStyle = {
      maxWidth: '42%',
      display: 'inline-block'
    };
    let inputDividerStyle = {
      display: 'inline-block',
      padding: '0 3px'
    };

    let opts = [];
    for (let opt in DateFilter.RuleType) {
      if (DateFilter.RuleType.hasOwnProperty(opt)) {
        opts.push(<option key={this.props.column.key + '-' + opt} value={opt}>{DateFilter.RuleType[opt].title}</option>);
      }
    }

    let selectSearchType = (
      <select key={'header-filter-select-' + this.props.column.key}
              defaultValue={this.comp.sortState}
              onChange={this.setSearchType}>
        {opts}
      </select>);

    let searchInputs = [];
    if (this.comp.sortState === 'between') {
      let divider = (<div style={inputDividerStyle} key={inputKey + '-dash'}>-</div>);
      searchInputs = [this.inputGen(inputKey + '-l', halfBlockStyle, this.leftChange),
                      divider,
                      this.inputGen(inputKey + '-r', halfBlockStyle, this.rightChange)];
    } else {
      searchInputs.push(this.inputGen(inputKey + '-l', fullBlockStyle, this.leftChange));
    }

    return (
      <div>
        <div>
         {searchInputs}
        </div>
        <div>
          {selectSearchType}
        </div>
      </div>
    );
  }
}

DateFilter.propTypes = {
  onChange: React.PropTypes.func.isRequired,
  column: React.PropTypes.shape(ExcelColumn)
};
export default DateFilter;
