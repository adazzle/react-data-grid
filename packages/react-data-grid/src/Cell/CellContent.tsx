import React from 'react';
import classNames from 'classnames';

import ChildRowDeleteButton from '../ChildRowDeleteButton';
import { Props as CellProps } from '../Cell';
import CellValue from './CellValue';

export type CellContentProps<R> = Pick<CellProps<R>,
'idx'
| 'rowIdx'
| 'rowData'
| 'column'
| 'value'
| 'isScrolling'
| 'expandableOptions'
| 'tooltip'
| 'height'
| 'cellControls'
| 'cellMetaData'
>;


export default function CellContent<R extends {}>({ idx, tooltip, expandableOptions, height, cellMetaData, cellControls, ...props }: CellContentProps<R>) {
  const { column } = props;
  const isExpandCell = expandableOptions ? expandableOptions.field === column.key : false;
  const treeDepth = expandableOptions ? expandableOptions.treeDepth : 0;
  const marginLeft = expandableOptions && isExpandCell ? expandableOptions.treeDepth * 30 : 0;

  function handleDeleteSubRow() {
    if (cellMetaData.onDeleteSubRow) {
      cellMetaData.onDeleteSubRow({
        idx,
        rowIdx: props.rowIdx,
        rowData: props.rowData,
        expandArgs: expandableOptions
      });
    }
  }

  const cellDeleter = expandableOptions && treeDepth > 0 && isExpandCell && (
    <ChildRowDeleteButton
      treeDepth={treeDepth}
      cellHeight={height}
      onDeleteSubRow={handleDeleteSubRow}
      isDeleteSubRowEnabled={!!cellMetaData.onDeleteSubRow}
    />
  );

  const classes = classNames('react-grid-Cell__value',
    { 'cell-tooltip': !!tooltip }
  );

  return (
    <div className={classes}>
      {cellDeleter}
      <div className="react-grid-Cell__container" style={{ marginLeft }}>
        <span><CellValue<R> {...props} /></span>
        {cellControls}
      </div>
      {tooltip && <span className="cell-tooltip-text">{tooltip}</span>}
    </div>
  );
}
