import NumericFilter from './NumericFilter';
import DateFilter from './DateFilter';
import DateTimeFilter from './DateTimeFilter';
import AutoCompleteFilter from './AutoCompleteFilter';
import MultiSelectFilter from './MultiSelectFilter';
import SingleSelectFilter from './SingleSelectFilter';

const Filters = {
  NumericFilter: NumericFilter,
  DateFilter: DateFilter,
  DateTimeFilter: DateTimeFilter,
  AutoCompleteFilter: AutoCompleteFilter,
  MultiSelectFilter: MultiSelectFilter,
  SingleSelectFilter: SingleSelectFilter
};

module.exports = Filters;
