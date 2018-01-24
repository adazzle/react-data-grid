import {fromJS} from 'immutable';

type Column = {
  key: string;
  left: number;
  width: number;
};

type Group = {
  key: string;
  left: number;
  width: number;
  columns: Array<Column>;
}

function getColumnWidthFromColumnMetrics(columnKey, columnMetrics) {
    const columns = columnMetrics.columns;
    return columns.find((column) => column.key === columnKey);
}

function setGroupWidths(groups, columnMetrics) {
  return groups.map(group => {
    const columnKeys = group.columns;
    group.width = columnKeys.reduce((groupWidth, columnKey) => {
      const column = getColumnWidthFromColumnMetrics(columnKey, columnMetrics);
      return groupWidth + column.width;
    }, 0);
    return group;
  });
}

function setGroupOffsets(groups, columnMetrics) {
  let left = 0;

  return groups.map(group => {
    const columnLefts = group.columns.map((columnKey) => {
      const column = getColumnWidthFromColumnMetrics(columnKey, columnMetrics);
      return column.left;
    });

    const columnKey = group.columns[0];

    group.left = Math.min.apply(Math, columnLefts);
    left += group.width;

    return group;
  });
}

function getGroupMetrics(groups, columnMetrics) {
  setGroupWidths(groups, columnMetrics);
  setGroupOffsets(groups, columnMetrics);

  return {
    groups: fromJS(groups),
    width: columnMetrics.width
  };
}


module.exports = { getColumnWidthFromColumnMetrics, setGroupWidths, setGroupOffsets, getGroupMetrics };
