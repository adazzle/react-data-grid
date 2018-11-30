const ReactDataGrid = require('react-data-grid');
const exampleWrapper = require('../components/exampleWrapper');
const React = require('react');
const FakeObjectDataStore = require('./FakeObjectDataStore');
const Immutable = require('immutable');
const {
  Editors:
    { AutoComplete: AutoCompleteEditor, DropDownEditor },
  Toolbar,
  Menu:
    { ContextMenu, MenuItem },
  Formatters:
    { ImageFormatter }} = require('react-data-grid-addons');
const faker = require('faker');

import PropTypes from 'prop-types';

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

const columns = [
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

class MyContextMenu extends React.Component {
  static propTypes = {
    rowIdx: PropTypes.string.isRequired,
    idx: PropTypes.string.isRequired
  };

  onItemClick = () => {
  };

  render() {
    return (
      <ContextMenu>
        <MenuItem data={{rowIdx: this.props.rowIdx, idx: this.props.idx}} onClick={this.onItemClick}>{this.props.rowIdx},{this.props.idx}</MenuItem>
      </ContextMenu>
    );
  }
}

class Component extends React.Component {
  static propTypes = {
    handleCellDrag: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    const fakeRows = FakeObjectDataStore.createRows(100);
    this.state = { rows: Immutable.fromJS(fakeRows)};
  }

  handleGridRowsUpdated = (e) => {
    const { fromRow, toRow, updated } = e;
    let rows = this.state.rows.slice();

    for (let i = fromRow; i <= toRow; i++) {
      rows = rows.update(i, r => r.merge(updated));
    }

    if (this.props.handleCellDrag) {
      this.props.handleCellDrag(e);
    }

    this.setState({ rows });
  };

  handleAddRow = ({ newRowIndex }) => {
    const newRow = {
      id: newRowIndex,
      firstName: '',
      lastName: ''
    };

    let rows = this.state.rows.slice();
    rows = rows.push(Immutable.fromJS(newRow));
    this.setState({ rows });
  };

  getRowAt = (index) => {
    if (index < 0 || index > this.getSize()) {
      return undefined;
    }
    return this.state.rows.get(index);
  };

  getSize = () => {
    return this.state.rows.size;
  };

  render() {
    return (
      <ReactDataGrid
        contextMenu={<MyContextMenu />}
        ref={(node) => this.reactDataGrid = node}
        enableCellSelect={true}
        columns={columns}
        rowGetter={this.getRowAt}
        rowsCount={this.getSize()}
        onGridRowsUpdated={this.handleGridRowsUpdated}
        toolbar={<Toolbar onAddRow={this.handleAddRow} onToggleFilter={()=>{}} numberOfRows={this.getSize()}/>}
        rowHeight={50}
        minHeight={600} />
      );
  }
}

module.exports = exampleWrapper({
  WrappedComponent: Component,
  exampleName: 'All the features grid with immutable data',
  exampleDescription: 'This example demonstrates all the features from the previous examples using immutable.',
  examplePath: './scripts/example14-all-features-immutable.js',
  examplePlaygroundLink: undefined
});

module.exports.Component = Component;
