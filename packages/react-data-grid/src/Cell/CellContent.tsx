import React, { createElement, cloneElement } from 'react';
import { isElement, isValidElementType } from 'react-is';
import classNames from 'classnames';

import { SimpleCellFormatter } from '../formatters';
import ChildRowDeleteButton from '../ChildRowDeleteButton';
import { CellMetaData } from '../common/types';
import { CellProps } from '../Cell';

export type CellContentProps<R> = Pick<CellProps<R>,
| 'idx'
| 'rowIdx'
| 'rowData'
| 'column'
| 'value'
| 'expandableOptions'
| 'tooltip'
| 'cellControls'
| 'isRowSelected'
| 'onRowSelectionChange'
| 'isSummaryRow'
> & Pick<CellMetaData<R>,
'onDeleteSubRow'
>;

export default function CellContent<R>({
  idx,
  rowIdx,
  column,
  rowData,
  value,
  tooltip,
  expandableOptions,
  onDeleteSubRow,
  cellControls,
  isRowSelected,
  isSummaryRow,
  onRowSelectionChange
}: CellContentProps<R>) {
  const isExpandCell = expandableOptions ? expandableOptions.field === column.key : false;
  const treeDepth = expandableOptions ? expandableOptions.treeDepth : 0;
  const style = expandableOptions && isExpandCell ? { marginLeft: expandableOptions.treeDepth * 30 } : undefined;

  function getFormatterDependencies(row: R) {
    // convention based method to get corresponding Id or Name of any Name or Id property
    const { getRowMetaData } = column;
    if (getRowMetaData) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('getRowMetaData for formatters is deprecated and will be removed in a future version of react-data-grid. Instead access row prop of formatter');
      }
      return getRowMetaData(row, column);
    }
  }

  function getFormatterProps() {
    return {
      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      value: value as any, //FIXME: fix value type
      column,
      rowIdx,
      row: rowData,
      isRowSelected,
      onRowSelectionChange,
      dependentValues: getFormatterDependencies(rowData),
      isSummaryRow
    };
  }

  function handleDeleteSubRow() {
    if (onDeleteSubRow) {
      onDeleteSubRow({
        idx,
        rowIdx,
        rowData,
        expandArgs: expandableOptions
      });
    }
  }

  const cellDeleter = expandableOptions && treeDepth > 0 && isExpandCell && (
    <ChildRowDeleteButton
      treeDepth={treeDepth}
      onDeleteSubRow={handleDeleteSubRow}
      isDeleteSubRowEnabled={!!onDeleteSubRow}
    />
  );

  const classes = classNames('rdg-cell-value',
    { 'rdg-cell-tooltip': !!tooltip }
  );

  const { formatter } = column;

  return (
    <div className={classes}>
      {cellDeleter}
      <div style={style}>
        {formatter === undefined
          ? <SimpleCellFormatter value={value as string} />
          : isValidElementType(formatter)
            ? createElement(formatter, getFormatterProps())
            : isElement(formatter)
              ? cloneElement(formatter, getFormatterProps())
              : null}
        {cellControls}
      </div>
      {tooltip && <span className="rdg-cell-tooltip-text">{tooltip}</span>}
    </div>
  );
}
