import React from 'react';
import { Provider, createState } from './rxjs/state/RxState';
import GridContainer from './GridContainer';
import reducer$ from './rxjs/Reducers';

const ReactDataGrid = (props) => {
  return (
    <Provider state$={createState(reducer$)}>
      <GridContainer {...props}/>
    </Provider>
  );
};

module.exports = ReactDataGrid;
