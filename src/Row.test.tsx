/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { shallow } from 'enzyme';

import Row from './Row';
import Cell from './Cell';
import { createColumns } from './test/utils';
import { RowRendererProps } from './types';
import EventBus from './EventBus';

type RowType = any;

describe('Row', () => {
  function setup(props: RowRendererProps<RowType>) {
    const wrapper = shallow<typeof Row>(<Row {...props} />);
    const cells = wrapper.find(Cell);
    return { wrapper, cells };
  }

  const requiredProperties: RowRendererProps<RowType> = {
    viewportColumns: createColumns(50),
    row: { key: 'value' },
    cellRenderer: Cell,
    rowIdx: 17,
    isRowSelected: false,
    eventBus: new EventBus(),
    top: 0
  };

  it('passes classname property', () => {
    const { wrapper } = setup(requiredProperties);
    const draggableDiv = wrapper.find('div').at(0);
    expect(draggableDiv.hasClass('rdg-row')).toBe(true);
  });
});
