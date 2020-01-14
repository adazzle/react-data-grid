import faker from 'faker';
import React, { useState, useMemo, useCallback, useRef } from 'react';
import { AutoSizer } from 'react-virtualized';
import DataGrid, { Column, SelectColumn, UpdateActions, DataGridHandle, RowUpdateEvent } from '../../src';
import DropDownEditor from './components/Editors/DropDownEditor';
import { ImageFormatter } from './components/Formatters';
import Toolbar from './components/Toolbar/Toolbar';

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

export default function AllFeatures() {
  const [rows, setRows] = useState(() => createRows(2000));
  const [selectedRows, setSelectedRows] = useState(() => new Set<string>());
  const gridRef = useRef<DataGridHandle>(null);

  const columns = useMemo((): Column<Row>[] => [
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
      resizable: true,
      headerRenderer: () => <ImageFormatter value={faker.image.cats()} />,
      formatter: ({ row }) => <ImageFormatter value={row.avatar} />
    },
    {
      key: 'title',
      name: 'Title',
      editor: React.forwardRef((props, ref) => <DropDownEditor<Row> ref={ref} {...props} options={titles} />),
      width: 200,
      resizable: true,
      formatter(props) {
        return (
          <div onClick={() => gridRef.current?.openCellEditor(props.rowIdx, props.column.idx)}>
            {props.row[props.column.key]}
          </div>
        );
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
  ], []);

  const handleRowUpdate = useCallback(({ fromRow, toRow, updated, action }: RowUpdateEvent<Row, Partial<Row>>): void => {
    const newRows = [...rows];
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
      newRows[i] = { ...newRows[i], ...updated };
    }

    setRows(newRows);
  }, [rows]);

  const handleAddRow = useCallback(({ newRowIndex }: { newRowIndex: number }): void => setRows([...rows, createFakeRowObjectData(newRowIndex)]), [rows]);

  return (
    <>
      <Toolbar onAddRow={handleAddRow} numberOfRows={rows.length} />
      <div className="grid-autosizer-wrapper">
        <AutoSizer>
          {({ height, width }) => (
            <DataGrid<Row, 'id'>
              ref={gridRef}
              enableCellSelect
              columns={columns}
              rows={rows}
              onRowsUpdate={handleRowUpdate}
              rowHeight={30}
              width={width}
              height={height}
              selectedRows={selectedRows}
              onSelectedRowsChange={setSelectedRows}
              enableCellCopyPaste
              enableCellDragAndDrop
            />
          )}
        </AutoSizer>
      </div>
    </>
  );
}
