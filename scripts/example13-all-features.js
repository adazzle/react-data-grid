const faker = require('faker');
const ReactDataGrid = require('react-data-grid');
const exampleWrapper = require('../components/exampleWrapper');
const React = require('react');
const { Editors, Toolbar, Formatters } = require('react-data-grid-addons');
import update from 'immutability-helper';
const { AutoComplete: AutoCompleteEditor, DropDownEditor } = Editors;
const { ImageFormatter } = Formatters;

faker.locale = 'en_GB';

const counties = [
  { id: 0, title: 'Bedfordshire'},
  { id: 1, title: 'Berkshire'},
  { id: 2, title: 'Buckinghamshire'},
  { id: 3, title: 'Cambridgeshire'},
  { id: 4, title: 'Cheshire'},
  { id: 5, title: 'Cornwall'},
  { id: 6, title: 'Cumbria, (Cumberland)'},
  { id: 7, title: 'Derbyshire'},
  { id: 8, title: 'Devon'},
  { id: 9, title: 'Dorset'},
  { id: 10, title: 'Durham'},
  { id: 11, title: 'Essex'},
  { id: 12, title: 'Gloucestershire'},
  { id: 13, title: 'Hampshire'},
  { id: 14, title: 'Hertfordshire'},
  { id: 15, title: 'Huntingdonshire'},
  { id: 16, title: 'Kent'},
  { id: 17, title: 'Lancashire'},
  { id: 18, title: 'Leicestershire'},
  { id: 19, title: 'Lincolnshire'},
  { id: 20, title: 'Middlesex'},
  { id: 21, title: 'Norfolk'},
  { id: 22, title: 'Northamptonshire'},
  { id: 23, title: 'Northumberland'},
  { id: 24, title: 'Nottinghamshire'},
  { id: 25, title: 'Northamptonshire'},
  { id: 26, title: 'Oxfordshire'},
  { id: 27, title: 'Northamptonshire'},
  { id: 28, title: 'Rutland'},
  { id: 29, title: 'Shropshire'},
  { id: 30, title: 'Somerset'},
  { id: 31, title: 'Staffordshire'},
  { id: 32, title: 'Suffolk'},
  { id: 33, title: 'Surrey'},
  { id: 34, title: 'Sussex'},
  { id: 35, title: 'Warwickshire'},
  { id: 36, title: 'Westmoreland'},
  { id: 37, title: 'Wiltshire'},
  { id: 38, title: 'Worcestershire'},
  { id: 39, title: 'Yorkshire'}
];

const titles = ['Dr.', 'Mr.', 'Mrs.', 'Miss', 'Ms.'];

class Example extends React.Component {
  constructor(props, context) {
    super(props, context);
    this._columns = [
      {
        key: 'id',
        name: 'ID',
        width: 80,
        resizable: true
      },
      {
        key: 'avartar',
        name: 'Avartar',
        width: 60,
        formatter: ImageFormatter,
        resizable: true,
        headerRenderer: <ImageFormatter value={faker.image.cats()} />
      },
      {
        key: 'county',
        name: 'County',
        editor: <AutoCompleteEditor options={counties}/>,
        width: 200,
        resizable: true
      },
      {
        key: 'title',
        name: 'Title',
        editor: <DropDownEditor options={titles}/>,
        width: 200,
        resizable: true,
        events: {
          onDoubleClick: function() {
            console.log('The user double clicked on title column');
          }
        }
      },
      {
        key: 'firstName',
        name: 'First Name',
        editable: true,
        width: 200,
        resizable: true
      },
      {
        key: 'lastName',
        name: 'Last Name',
        editable: true,
        width: 200,
        resizable: true
      },
      {
        key: 'email',
        name: 'Email',
        editable: true,
        width: 200,
        resizable: true
      },
      {
        key: 'street',
        name: 'Street',
        editable: true,
        width: 200,
        resizable: true
      },
      {
        key: 'zipCode',
        name: 'ZipCode',
        editable: true,
        width: 200,
        resizable: true
      },
      {
        key: 'date',
        name: 'Date',
        editable: true,
        width: 200,
        resizable: true
      },
      {
        key: 'bs',
        name: 'bs',
        editable: true,
        width: 200,
        resizable: true
      },
      {
        key: 'catchPhrase',
        name: 'Catch Phrase',
        editable: true,
        width: 200,
        resizable: true
      },
      {
        key: 'companyName',
        name: 'Company Name',
        editable: true,
        width: 200,
        resizable: true
      },
      {
        key: 'sentence',
        name: 'Sentence',
        editable: true,
        width: 200,
        resizable: true
      }
    ];

    this.state = { rows: this.createRows(2000) };
  }

  createRows = (numberOfRows) => {
    let rows = [];
    for (let i = 0; i < numberOfRows; i++) {
      rows[i] = this.createFakeRowObjectData(i);
    }
    return rows;
  };

  createFakeRowObjectData = (index) => {
    return {
      id: 'id_' + index,
      avartar: faker.image.avatar(),
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
    };
  };

  getColumns = () => {
    let clonedColumns = this._columns.slice();
    clonedColumns[2].events = {
      onClick: (ev, args) => {
        const idx = args.idx;
        const rowIdx = args.rowIdx;
        this.grid.openCellEditor(rowIdx, idx);
      }
    };

    return clonedColumns;
  };

  handleGridRowsUpdated = ({ fromRow, toRow, updated }) => {
    let rows = this.state.rows.slice();

    for (let i = fromRow; i <= toRow; i++) {
      let rowToUpdate = rows[i];
      let updatedRow = update(rowToUpdate, {$merge: updated});
      rows[i] = updatedRow;
    }

    this.setState({ rows });
  };

  handleAddRow = ({ newRowIndex }) => {
    const newRow = {
      value: newRowIndex,
      userStory: '',
      developer: '',
      epic: ''
    };

    let rows = this.state.rows.slice();
    rows = update(rows, {$push: [newRow]});
    this.setState({ rows });
  };

  getRowAt = (index) => {
    if (index < 0 || index > this.getSize()) {
      return undefined;
    }

    return this.state.rows[index];
  };

  getSize = () => {
    return this.state.rows.length;
  };

  render() {
    return (
      <ReactDataGrid
        ref={ node => this.grid = node }
        enableCellSelect={true}
        columns={this.getColumns()}
        rowGetter={this.getRowAt}
        rowsCount={this.getSize()}
        onGridRowsUpdated={this.handleGridRowsUpdated}
        toolbar={<Toolbar onAddRow={this.handleAddRow}/>}
        enableRowSelect={true}
        rowHeight={50}
        minHeight={600}
        rowScrollTimeout={200} />);
  }
}

module.exports = exampleWrapper({
  WrappedComponent: Example,
  exampleName: 'All the features grid',
  exampleDescription: 'This example demonstrates all the features from the previous examples.',
  examplePath: './scripts/example13-all-features.js',
  examplePlaygroundLink: undefined
});
