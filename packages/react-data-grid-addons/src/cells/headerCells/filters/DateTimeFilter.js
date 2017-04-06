import DateFilter from './DateFilter';


class DateTimeFilter extends DateFilter {
  /* Allows a user to search a column by date and time (to the nearest minute)
  *  Assumptions:
  *  All incoming dates are UTC
  *  User wantes to search in local tme zone, NOT UTC
  */

  constructor(props) {
    super(props);

    this.filterValues = this.filterValues.bind(this);
    this.inputGen = this.inputGen.bind(this);
  }

  filterValues(row, columnFilter, columnKey) {
    if (columnFilter.filterTerm == null) { return true; }

    // implement default filter logic
    let value = new Date(row[columnKey]);
    for (let rule of columnFilter.filterTerm) {

      // just check to the nearest minute
      if (rule.hasOwnProperty('eq')) {
        let floorMin = new Date(value);
        floorMin.setSeconds(0, 0);
        let tmpEq = new Date(rule.eq);
        tmpEq.setSeconds(0, 0);
        if (!(rule.eq.toLocaleString() === floorMin.toLocaleString())) { return false; }
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

  inputGen(key, blockStyle, changeHandler, type="datetime-local") {
    return super.inputGen(key, blockStyle, changeHandler, type);
  }

}

DateTimeFilter.propTypes = DateFilter.propTypes;

export default DateTimeFilter;
