import React from 'react';
import classNames from 'classnames';

import { CellMetaData } from '../common/types';
import ChildRowDeleteButton from '../ChildRowDeleteButton';
import { CellProps } from '../Cell';
import CellValue from './CellValue';

export type CellContentProps<R> = Pick<CellProps<R>,
| 'idx'
| 'rowIdx'
| 'rowData'
| 'column'
| 'value'
| 'expandableOptions'
| 'tooltip'
| 'height'
| 'cellControls'
| 'isRowSelected'
| 'onRowSelectionChange'
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
  height,
  onDeleteSubRow,
  cellControls,
  isRowSelected,
  onRowSelectionChange
}: CellContentProps<R>) {
  const isExpandCell = expandableOptions ? expandableOptions.field === column.key : false;
  const treeDepth = expandableOptions ? expandableOptions.treeDepth : 0;
  const style = expandableOptions && isExpandCell ? { marginLeft: expandableOptions.treeDepth * 30 } : undefined;

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
      cellHeight={height}
      onDeleteSubRow={handleDeleteSubRow}
      isDeleteSubRowEnabled={!!onDeleteSubRow}
    />
  );

  const classes = classNames('rdg-cell-value',
    { 'rdg-cell-tooltip': !!tooltip }
  );

  return (
    <div className={classes}>
      {cellDeleter}
      <div style={style}>
        <CellValue<R>
          rowIdx={rowIdx}
          rowData={rowData}
          column={column}
          value={value}
          isRowSelected={isRowSelected}
          onRowSelectionChange={onRowSelectionChange}
        />
        {cellControls}
      </div>
      {tooltip && <span className="rdg-cell-tooltip-text">{tooltip}</span>}
    </div>
  );
}
