import NumericFilter from './NumericFilter';
import AutoCompleteFilter from './AutoCompleteFilter';
import MultiSelectFilter from './MultiSelectFilter';
import SingleSelectFilter from './SingleSelectFilter';
import YafFilter from './yafFilter/YafFilter';

const Filters = {
  NumericFilter: NumericFilter,
  AutoCompleteFilter: AutoCompleteFilter,
  MultiSelectFilter: MultiSelectFilter,
  SingleSelectFilter: SingleSelectFilter,
  YafFilter: YafFilter
};

module.exports = Filters;
