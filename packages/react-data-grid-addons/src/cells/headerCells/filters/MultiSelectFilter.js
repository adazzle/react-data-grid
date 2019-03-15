import React from 'react';

import AutoCompleteFilter from './AutoCompleteFilter';

export default function MultiSelectFilter(props) {
  return <AutoCompleteFilter {...props} multiSelection={true} />;
}
