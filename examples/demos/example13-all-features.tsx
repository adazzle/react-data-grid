import faker from 'faker';
import React from 'react';
import { AutoSizer } from 'react-virtualized';
import DataGrid, { Column, SelectColumn, UpdateActions, DataGridHandle, GridRowsUpdatedEvent } from '../../src';
import DropDownEditor from './components/Editors/DropDownEditor';
import ImageFormatter from './components/Formatters/ImageFormatter';
import Toolbar from './components/Toolbar/Toolbar';
import Wrapper from './Wrapper';

interface Row {
  id: string;
  avatar: string;
  email: string;
  title: string;
  firstName: string;
  lastName: string;
  street: string;
  zipCode: string;
  date: string;
  bs: string;
  catchPhrase: string;
  companyName: string;
  words: string;
  sentence: string;
}

interface State {
  rows: Row[];
  selectedRows: Set<string>;
}

faker.locale = 'en_GB';

const titles = ['Dr.', 'Mr.', 'Mrs.', 'Miss', 'Ms.'];

function createFakeRowObjectData(index: number): Row {
  return {
    id: `id_${index}`,
    avatar: faker.image.avatar(),
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
}

function createRows(numberOfRows: number): Row[] {
  const rows: Row[] = [];

  for (let i = 0; i < numberOfRows; i++) {
    rows[i] = createFakeRowObjectData(i);
  }

  return rows;
}

export default class extends React.Component<{}, State> {
  readonly state: Readonly<State> = {
    rows: createRows(2000),
    selectedRows: new Set()
  };

  gridRef: React.RefObject<DataGridHandle> = React.createRef();
  columns: Column<Row>[] = [
    SelectColumn,
    {
      key: 'id',
      name: 'ID',
      width: 80,
      resizable: true,
      frozen: true
    },
    {
      key: 'avatar',
      name: 'Avatar',
      width: 40,
      formatter: ImageFormatter,
      resizable: true,
      headerRenderer() {
        return <ImageFormatter value={faker.image.cats()} />;
      }
    },
    {
      key: 'title',
      name: 'Title',
      editor: <DropDownEditor<Row> options={titles} column={{} as Column<Row>} onBlur={() => {}} />,
      width: 200,
      resizable: true,
      events: {
        onClick: (ev, { idx, rowIdx }) => {
          this.gridRef?.current?.openCellEditor(rowIdx, idx);
        }
      }
    },
    {
      key: 'firstName',
      name: 'First Name',
      editable: true,
      width: 200,
      resizable: true,
      frozen: true
    },
    {
      key: 'lastName',
      name: 'Last Name',
      editable: true,
      width: 200,
      resizable: true,
      frozen: true
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

  handleGridRowsUpdated = ({ fromRow, toRow, updated, action }: GridRowsUpdatedEvent<Row, Partial<Row>>): void => {
    this.setState((state) => {
      const rows = [...state.rows];
      let start;
      let end;

      if (action === UpdateActions.COPY_PASTE) {
        start = toRow;
        end = toRow;
      } else {
        start = Math.min(fromRow, toRow);
        end = Math.max(fromRow, toRow);
      }

      for (let i = start; i <= end; i++) {
        rows[i] = { ...rows[i], ...updated };
      }

      return { rows };
    });
  };

  handleAddRow = ({ newRowIndex }: { newRowIndex: number}): void => {
    this.setState((state) => {
      const newRow = createFakeRowObjectData(newRowIndex);
      const rows = [...state.rows, newRow];
      return { rows };
    });
  };

  getRowAt = (index: number): Row => {
    return this.state.rows[index];
  };

  getSize = (): number => {
    return this.state.rows.length;
  };

  onSelectedRowsChange = (selectedRows: Set<string>): void => {
    this.setState({ selectedRows });
  };

  render() {
    return (
      <Wrapper title="All the features grid">
        <>
          <Toolbar onAddRow={this.handleAddRow} numberOfRows={this.state.rows.length} />
          <div className="grid-autosizer-wrapper">
            <AutoSizer>
              {({ height, width }) => (
                <DataGrid<Row, keyof Row>
                  ref={this.gridRef}
                  enableCellSelect
                  columns={this.columns}
                  rowGetter={this.getRowAt}
                  rowsCount={this.getSize()}
                  onGridRowsUpdated={this.handleGridRowsUpdated}
                  rowHeight={30}
                  minWidth={width}
                  minHeight={height}
                  selectedRows={this.state.selectedRows}
                  onSelectedRowsChange={this.onSelectedRowsChange}
                  enableCellCopyPaste
                  enableCellDragAndDrop
                />
              )}
            </AutoSizer>
          </div>
        </>
      </Wrapper>
    );
  }
}
