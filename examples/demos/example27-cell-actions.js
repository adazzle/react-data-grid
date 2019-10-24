import React from 'react';
import DataGrid from 'react-data-grid';
import { Data, Formatters } from 'react-data-grid-addons';
import { Clear, Link, FileCopy } from '@material-ui/icons';
import faker from 'faker';
import Wrapper from './Wrapper';

const { Selectors } = Data;
const { ImageFormatter } = Formatters;

faker.locale = 'en_GB';

const createFakeRowObjectData = (index) => ({
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

const createRows = (numberOfRows) => {
  const rows = [];
  for (let i = 0; i < numberOfRows; i++) {
    rows[i] = createFakeRowObjectData(i);
  }
  return rows;
};

const columns = [
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
    width: 200
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

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = { rows: createRows(2000) };
  }

  getRows = () => {
    return Selectors.getRows(this.state);
  };

  getRowAt = (index) => {
    const rows = this.getRows();
    return rows[index];
  };

  getSize = () => {
    return this.getRows().length;
  };

  getCellActions(column, row) {
    if (column.key === 'county' && row.id === 'id_0') {
      return [
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
    }
  }

  render() {
    return (
      <Wrapper title="Cell Actions Example">
        <DataGrid
          ref={node => this.grid = node}
          enableCellSelect
          columns={columns}
          rowGetter={this.getRowAt}
          rowsCount={this.getSize()}
          rowHeight={55}
          minHeight={600}
          getCellActions={this.getCellActions}
        />
      </Wrapper>
    );
  }
}
