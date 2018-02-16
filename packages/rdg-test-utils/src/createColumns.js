
export const createColumn = (index, props) => {
  const key = `Column${index}`;
  return {
    ...{
      key,
      name: key,
      Id: index,
      editable: true,
      getRowMetaData: () => []
    },
    ...props
  };
};

export const createColumns = (count) => [...Array(count).keys()].map(i => createColumn(i));
