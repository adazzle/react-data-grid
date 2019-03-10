import React from 'react';

import AutoCompleteFilter from './AutoCompleteFilter';

export default function SingleSelectFilter(props) {
  return <AutoCompleteFilter {...props} multiSelection={false} />;
}

