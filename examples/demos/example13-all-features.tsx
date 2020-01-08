import faker from 'faker';
import React, { useState, useMemo, useCallback, useRef } from 'react';
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

export default function AllFeaturesExample(): JSX.Element {
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
      formatter: ImageFormatter,
      resizable: true,
      headerRenderer() {
        return <ImageFormatter value={faker.image.cats()} />;
      }
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

  const handleGridRowsUpdated = useCallback(({ fromRow, toRow, updated, action }: GridRowsUpdatedEvent<Row, Partial<Row>>): void => {
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

  const getRowAt = useCallback((index: number): Row => rows[index], [rows]);

  const getSize = useCallback((): number => rows.length, [rows.length]);

  const onSelectedRowsChange = useCallback((newSelectedRows: Set<string>): void => setSelectedRows(newSelectedRows), []);

  return (
    <Wrapper title="All the features grid">
      <>
        <Toolbar onAddRow={handleAddRow} numberOfRows={rows.length} />
        <div className="grid-autosizer-wrapper">
          <AutoSizer>
            {({ height, width }) => (
              <DataGrid<Row, 'id'>
                ref={gridRef}
                enableCellSelect
                columns={columns}
                rowGetter={getRowAt}
                rowsCount={getSize()}
                onGridRowsUpdated={handleGridRowsUpdated}
                rowHeight={30}
                minWidth={width}
                minHeight={height}
                selectedRows={selectedRows}
                onSelectedRowsChange={onSelectedRowsChange}
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
