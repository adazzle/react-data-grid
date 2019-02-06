import React from 'react';
import ReactDataGrid from 'react-data-grid';
import createRowData from `${process.cwd()}/core/createFakeData`;

const defaultColumnProperties = {
  width: 160
};

const columns = [
  {
    key: "id",
    name: "ID"
  },
  {
    key: "firstName",
    name: "First Name"
  },
  {
    key: "lastName",
    name: "Last Name"
  },
  {
    key: "jobTitle",
    name: "Job Title"
  },
  {
    key: "jobArea",
    name: "Job Area"
  },
  {
    key: "jobType",
    name: "Job Type"
  },
  {
    key: "email",
    name: "Email"
  },
  {
    key: "street",
    name: "Street"
  },
  {
    key: "zipCode",
    name: "ZipCode"
  },
  {
    key: "date",
    name: "Date"
  },
  {
    key: "catchPhrase",
    name: "Catch Phrase"
  }
].map(c => ({ ...c, ...defaultColumnProperties }));

const ROW_COUNT = 50;

const groupBy = ["jobType"];

const getSubRowDetails = expandedRows => rowItem => {
  const isExpanded = expandedRows[rowItem.name] ? expandedRows[rowItem.name] : false;
  return {
    group: rowItem.teamMembers && rowItem.teamMembers.length > 0,
    expanded: isExpanded,
    children: rowItem.teamMembers,
    field: 'firstName',
    treeDepth: rowItem.treeDepth || 0,
    siblingIndex: rowItem.siblingIndex,
    numberSiblings: rowItem.numberSiblings
  };
};

const rows = createRowData(50);
function Example() {
  return (
    <div>
      <ReactDataGrid
        columns={columns}
        rowGetter={i => rows[i]}
        rowsCount={rows.length}
        minHeight={650}
      />
    </div>
  );
}

export default Example;

