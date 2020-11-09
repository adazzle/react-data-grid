import { useState } from 'react';
import faker from 'faker';

import DataGrid from '../../src';
import type { Column } from '../../src';
import { CellActionsFormatter, ImageFormatter } from './components/Formatters';

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

const createRows = () => {
  const rows = [];
  for (let i = 0; i < 500; i++) {
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
    formatter: ({ row }) => <ImageFormatter value={row.avatar} />
  },
  {
    key: 'county',
    name: 'County',
    width: 200,
    formatter({ row }) {
      if (row.id === 'id_0') {
        const actions = [
          {
            icon: '🗑️',
            callback() { alert('Deleting'); }
          },
          {
            icon: '🔗',
            actions: [
              {
                text: '✍️ Edit Cell',
                callback() { alert('Edit Cell'); }
              },
              {
                text: '📋 Copy Cell',
                callback() { alert('Copied'); }
              }
            ]
          }
        ];

        return (
          <>
            <CellActionsFormatter actions={actions} />
            <div>
              {row.county}
            </div>
          </>
        );
      }

      return <>{row.county}</>;
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

export function CellActions() {
  const [rows] = useState(createRows);

  return (
    <DataGrid
      columns={columns}
      rows={rows}
      rowHeight={55}
      className="fill-grid"
    />
  );
}

CellActions.storyName = 'Cell Actions';
