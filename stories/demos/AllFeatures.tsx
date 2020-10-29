import faker from 'faker';
import React, { useState, useCallback, useRef } from 'react';
import DataGrid, { Column, SelectColumn, DataGridHandle, RowsUpdateEvent, TextEditor } from '../../src';
import DropDownEditor from './components/Editors/DropDownEditor';
import { ImageFormatter } from './components/Formatters';
import Toolbar from './components/Toolbar/Toolbar';

import './AllFeatures.less';

export interface Row {
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

function rowKeyGetter(row: Row) {
  return row.id;
}

faker.locale = 'en_GB';

const columns: readonly Column<Row>[] = [
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
    width: 200,
    resizable: true,
    formatter(props) {
      return <>{props.row.title}</>;
    },
    editor: DropDownEditor,
    editorOptions: {
      editOnClick: true
    }
  },
  {
    key: 'firstName',
    name: 'First Name',
    width: 200,
    resizable: true,
    frozen: true,
    editor: TextEditor
  },
  {
    key: 'lastName',
    name: 'Last Name',
    width: 200,
    resizable: true,
    frozen: true,
    editor: TextEditor
  },
  {
    key: 'email',
    name: 'Email',
    width: 200,
    resizable: true,
    editor: TextEditor
  },
  {
    key: 'street',
    name: 'Street',
    width: 200,
    resizable: true,
    editor: TextEditor
  },
  {
    key: 'zipCode',
    name: 'ZipCode',
    width: 200,
    resizable: true,
    editor: TextEditor
  },
  {
    key: 'date',
    name: 'Date',
    width: 200,
    resizable: true,
    editor: TextEditor
  },
  {
    key: 'bs',
    name: 'bs',
    width: 200,
    resizable: true,
    editor: TextEditor
  },
  {
    key: 'catchPhrase',
    name: 'Catch Phrase',
    width: 200,
    resizable: true,
    editor: TextEditor
  },
  {
    key: 'companyName',
    name: 'Company Name',
    width: 200,
    resizable: true,
    editor: TextEditor
  },
  {
    key: 'sentence',
    name: 'Sentence',
    width: 200,
    resizable: true,
    editor: TextEditor
  }
];

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

function isAtBottom(event: React.UIEvent<HTMLDivElement>): boolean {
  const target = event.target as HTMLDivElement;
  return target.clientHeight + target.scrollTop === target.scrollHeight;
}

function loadMoreRows(newRowsCount: number, length: number): Promise<Row[]> {
  return new Promise(resolve => {
    const newRows: Row[] = [];

    for (let i = 0; i < newRowsCount; i++) {
      newRows[i] = createFakeRowObjectData(i + length);
    }

    setTimeout(() => resolve(newRows), 1000);
  });
}

export function AllFeatures() {
  const [rows, setRows] = useState(() => createRows(2000));
  const [selectedRows, setSelectedRows] = useState(() => new Set<React.Key>());
  const [isLoading, setIsLoading] = useState(false);
  const gridRef = useRef<DataGridHandle>(null);

  const handleRowUpdate = useCallback(({ fromRow, toRow, updated, action }: RowsUpdateEvent<Partial<Row>>): void => {
    const newRows = [...rows];
    let start: number;
    let end: number;

    if (action === 'COPY_PASTE') {
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

  async function handleScroll(event: React.UIEvent<HTMLDivElement>) {
    if (!isAtBottom(event)) return;

    setIsLoading(true);

    const newRows = await loadMoreRows(50, rows.length);

    setRows([...rows, ...newRows]);
    setIsLoading(false);
  }

  return (
    <div className="all-features">
      <Toolbar onAddRow={handleAddRow} numberOfRows={rows.length} />
      <DataGrid
        ref={gridRef}
        columns={columns}
        rows={rows}
        rowKeyGetter={rowKeyGetter}
        onRowsUpdate={handleRowUpdate}
        onRowsChange={setRows}
        rowHeight={30}
        selectedRows={selectedRows}
        onScroll={handleScroll}
        onSelectedRowsChange={setSelectedRows}
        rowClass={row => row.id.includes('7') ? 'highlight' : undefined}
        enableCellCopyPaste
        enableCellDragAndDrop
      />
      {isLoading && <div className="load-more-rows-tag">Loading more rows...</div>}
    </div>
  );
}

AllFeatures.storyName = 'All Features';
