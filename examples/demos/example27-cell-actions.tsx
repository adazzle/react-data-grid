import React, { useState } from 'react';
import { Clear, Link, FileCopy } from '@material-ui/icons';
import faker from 'faker';

import DataGrid, { Column } from '../../src';
import Wrapper from './Wrapper';
import { CellActionsFormatter, ImageFormatter } from './formatters';

faker.locale = 'en_GB';

const createFakeRowObjectData = (index: number) => ({
  id: `id_${index}`,
  avatar: faker.image.avatar(),
  county: faker.address.county(),
  email: faker.internet.email(),
  title: faker.name.prefix(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  street: faker.address.streetName(),
  zipCode: faker.address.zipCode(),
  date: faker.date.past().toLocaleDateString(),
  bs: faker.company.bs(),
  catchPhrase: faker.company.catchPhrase(),
  companyName: faker.company.companyName(),
  words: faker.lorem.words(),
  sentence: faker.lorem.sentence()
});

type Row = ReturnType<typeof createFakeRowObjectData>;

const createRows = (numberOfRows: number) => {
  const rows = [];
  for (let i = 0; i < numberOfRows; i++) {
    rows[i] = createFakeRowObjectData(i);
  }
  return rows;
};

const columns: Column<Row>[] = [
  {
    key: 'id',
    name: 'ID',
    width: 80,
    resizable: true
  },
  {
    key: 'avatar',
    name: 'Avatar',
    width: 60,
    formatter: ImageFormatter
  },
  {
    key: 'county',
    name: 'County',
    width: 200,
    cellClass: 'rdg-cell-action',
    formatter({ row, value }) {
      if (row.id === 'id_0') {
        const actions = [
          {
            icon: <Clear />,
            callback() { alert('Deleting'); }
          },
          {
            icon: <Link />,
            actions: [
              {
                text: 'Edit Cell',
                callback() { alert('Edit Cell'); }
              },
              {
                text: <><FileCopy /> Copy Cell</>,
                callback() { alert('Copied'); }
              }
            ]
          }
        ];

        return (
          <>
            <CellActionsFormatter actions={actions} />
            <div>
              {value}
            </div>
          </>
        );
      }

      return <>{value}</>;
    }
  },
  {
    key: 'title',
    name: 'Title',
    width: 200
  },
  {
    key: 'firstName',
    name: 'First Name',
    width: 200
  },
  {
    key: 'lastName',
    name: 'Last Name',
    width: 200
  },
  {
    key: 'email',
    name: 'Email',
    width: 200
  },
  {
    key: 'street',
    name: 'Street',
    width: 200
  },
  {
    key: 'zipCode',
    name: 'ZipCode',
    width: 200
  },
  {
    key: 'date',
    name: 'Date',
    width: 200
  },
  {
    key: 'bs',
    name: 'bs',
    width: 200
  },
  {
    key: 'catchPhrase',
    name: 'Catch Phrase',
    width: 200
  },
  {
    key: 'companyName',
    name: 'Company Name',
    width: 200
  },
  {
    key: 'sentence',
    name: 'Sentence',
    width: 200
  }
];

export default function() {
  const [rows] = useState(() => createRows(2000));

  return (
    <Wrapper title="Cell Actions Example">
      <DataGrid<Row, 'id'>
        enableCellSelect
        columns={columns}
        rowGetter={i => rows[i]}
        rowsCount={rows.length}
        rowHeight={55}
        minHeight={600}
      />
    </Wrapper>
  );
}
