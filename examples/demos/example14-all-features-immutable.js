import React from 'react';
import PropTypes from 'prop-types';
import DataGrid from 'react-data-grid';
import { Editors, Toolbar, Menu, Formatters } from 'react-data-grid-addons';
import faker from 'faker';
import Wrapper from './Wrapper';
import FakeObjectDataStore from './FakeObjectDataStore';

const { DropDownEditor } = Editors;
const { ImageFormatter } = Formatters;
const { ContextMenu, MenuItem } = Menu;

const titles = ['Dr.', 'Mr.', 'Mrs.', 'Miss', 'Ms.'];

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
    formatter: ImageFormatter,
    resizable: true,
    headerRenderer: <ImageFormatter value={faker.image.cats()} />
  },
  {
    key: 'title',
    name: 'Title',
    editor: <DropDownEditor options={titles} />,
    width: 200,
    resizable: true,
    events: {
      onDoubleClick() {
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
        <MenuItem data={{ rowIdx: this.props.rowIdx, idx: this.props.idx }} onClick={this.onItemClick}>{this.props.rowIdx},{this.props.idx}</MenuItem>
      </ContextMenu>
    );
  }
}

export default class extends React.Component {
  static propTypes = {
    handleCellDrag: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    const fakeRows = FakeObjectDataStore.createRows(100);
    this.state = { rows: fakeRows };
  }

  handleGridRowsUpdated = (e) => {
    const { fromRow, toRow, updated } = e;
    const rows = [...this.state.rows];

    for (let i = fromRow; i <= toRow; i++) {
      rows[i] = { ...rows[i], ...updated };
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

    this.setState({ rows: [...this.state.rows, newRow] });
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
      <Wrapper title="All the features grid with immutable data">
        <Toolbar onAddRow={this.handleAddRow} onToggleFilter={() => { }} numberOfRows={this.getSize()} />
        <DataGrid
          contextMenu={<MyContextMenu />}
          enableCellSelect
          columns={columns}
          rowGetter={this.getRowAt}
          rowsCount={this.getSize()}
          onGridRowsUpdated={this.handleGridRowsUpdated}
          rowHeight={50}
          minHeight={600}
        />
      </Wrapper>
    );
  }
}
