/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { shallow } from 'enzyme';

import Row from '../Row';
import Cell from '../Cell';
import { createColumns } from './utils';
import { IRowRendererProps } from '../common/types';
import EventBus from '../EventBus';

type RowType = any;

describe('Row', () => {
  const COLUMN_COUNT = 50;

  function setup(props: IRowRendererProps<RowType>) {
    const wrapper = shallow<Row<RowType>>(<Row {...props} />);
    const cells = wrapper.find(Cell);
    return { wrapper, cells };
  }

  const columns = createColumns(COLUMN_COUNT);
  const requiredProperties: IRowRendererProps<RowType> = {
    height: 30,
    width: 1000,
    columns,
    viewportColumns: columns.slice(0, 20),
    row: { key: 'value' },
    cellRenderer: Cell,
    idx: 17,
    scrollLeft: 0,
    lastFrozenColumnIndex: -1,
    isRowSelected: false,
    isSummaryRow: false,
    eventBus: new EventBus()
  };

  it('passes classname property', () => {
    const { wrapper } = setup(requiredProperties);
    const draggableDiv = wrapper.find('div').at(0);
    expect(draggableDiv.hasClass('rdg-row'));
  });

  it('passes style property', () => {
    const { wrapper } = setup(requiredProperties);
    const draggableDiv = wrapper.find('div').at(0);
    expect(draggableDiv.props().style).toBeDefined();
  });
});
