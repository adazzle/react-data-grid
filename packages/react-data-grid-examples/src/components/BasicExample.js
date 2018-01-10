import React from 'react';

const ColsDescription = require('./ColsDescription');
const RowsDescription = require('./RowsDescription');
const RenderGridDescription = require('./RenderGrid');

function BasicExample() {
  return (
    <div>
      <h3 id="js-basic-example">A Simple Example</h3>
      <p>The most basic implementation of ReactDataGrid requires 4 properties; an array of columns, a rowGetter function to retrive a row for a given index, the number of rows the grid expects and the minimum height of the grid.</p>
      <p>The columns property is an array of object that has at a minimum key and name properties</p>
      <ColsDescription />
      <RowsDescription />
      <RenderGridDescription />
    </div>
  );
}

module.exports = BasicExample;
