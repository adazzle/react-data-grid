import { useState } from 'react';
import { createLazyFileRoute } from '@tanstack/react-router';
import { css } from '@linaria/core';

import { DataGrid, SelectColumn, textEditor } from '../../src';
import type { Column, CopyEvent, FillEvent, PasteEvent } from '../../src';
import { textEditorClassname } from '../../src/editors/textEditor';
import { useDirection } from '../directionContext';

export const Route = createLazyFileRoute('/AllFeatures')({
  component: AllFeatures
});

const highlightClassname = css`
  .rdg-cell {
    background-color: #9370db;
    color: white;
  }

  &:hover .rdg-cell {
    background-color: #800080;
  }
`;

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

const avatarClassname = css`
  margin: auto;
  background-size: 100%;
  block-size: 28px;
  inline-size: 28px;
`;

const titles = ['Dr.', 'Mr.', 'Mrs.', 'Miss', 'Ms.'] as const;

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
    renderCell({ row }) {
      return <div className={avatarClassname} style={{ backgroundImage: `url(${row.avatar})` }} />;
    }
  },
  {
    key: 'title',
    name: 'Title',
    width: 200,
    resizable: true,
    renderEditCell({ row, onRowChange }) {
      return (
        <select
          className={textEditorClassname}
          value={row.title}
          onChange={(event) => onRowChange({ ...row, title: event.target.value }, true)}
          autoFocus
        >
          {titles.map((title) => (
            <option key={title} value={title}>
              {title}
            </option>
          ))}
        </select>
      );
    }
  },
  {
    key: 'firstName',
    name: 'First Name',
    width: 200,
    resizable: true,
    frozen: true,
    renderEditCell: textEditor
  },
  {
    key: 'lastName',
    name: 'Last Name',
    width: 200,
    resizable: true,
    frozen: true,
    renderEditCell: textEditor
  },
  {
    key: 'email',
    name: 'Email',
    width: 'max-content',
    resizable: true,
    renderEditCell: textEditor
  },
  {
    key: 'street',
    name: 'Street',
    width: 200,
    resizable: true,
    renderEditCell: textEditor
  },
  {
    key: 'zipCode',
    name: 'ZipCode',
    width: 200,
    resizable: true,
    renderEditCell: textEditor
  },
  {
    key: 'date',
    name: 'Date',
    width: 200,
    resizable: true,
    renderEditCell: textEditor
  },
  {
    key: 'bs',
    name: 'bs',
    width: 200,
    resizable: true,
    renderEditCell: textEditor
  },
  {
    key: 'catchPhrase',
    name: 'Catch Phrase',
    width: 'max-content',
    resizable: true,
    renderEditCell: textEditor
  },
  {
    key: 'companyName',
    name: 'Company Name',
    width: 200,
    resizable: true,
    renderEditCell: textEditor
  },
  {
    key: 'sentence',
    name: 'Sentence',
    width: 'max-content',
    resizable: true,
    renderEditCell: textEditor
  }
];

function AllFeatures() {
  const direction = useDirection();
  const initialRows = Route.useLoaderData();
  const [rows, setRows] = useState(initialRows);
  const [selectedRows, setSelectedRows] = useState((): ReadonlySet<string> => new Set());

  function handleFill({ columnKey, sourceRow, targetRow }: FillEvent<Row>): Row {
    return { ...targetRow, [columnKey]: sourceRow[columnKey as keyof Row] };
  }

  function handlePaste({
    sourceColumnKey,
    sourceRow,
    targetColumnKey,
    targetRow
  }: PasteEvent<Row>): Row {
    const incompatibleColumns = ['email', 'zipCode', 'date'];
    if (
      sourceColumnKey === 'avatar' ||
      ['id', 'avatar'].includes(targetColumnKey) ||
      ((incompatibleColumns.includes(targetColumnKey) ||
        incompatibleColumns.includes(sourceColumnKey)) &&
        sourceColumnKey !== targetColumnKey)
    ) {
      return targetRow;
    }

    return { ...targetRow, [targetColumnKey]: sourceRow[sourceColumnKey as keyof Row] };
  }

  function handleCopy({ sourceRow, sourceColumnKey }: CopyEvent<Row>): void {
    if (window.isSecureContext) {
      navigator.clipboard.writeText(sourceRow[sourceColumnKey as keyof Row]);
    }
  }

  return (
    <DataGrid
      columns={columns}
      rows={rows}
      rowKeyGetter={rowKeyGetter}
      onRowsChange={setRows}
      onFill={handleFill}
      onCopy={handleCopy}
      onPaste={handlePaste}
      rowHeight={30}
      selectedRows={selectedRows}
      isRowSelectionDisabled={(row) => row.id === 'id_2'}
      onSelectedRowsChange={setSelectedRows}
      className="fill-grid"
      rowClass={(row, index) =>
        row.id.includes('7') || index === 0 ? highlightClassname : undefined
      }
      direction={direction}
      onCellClick={(args, event) => {
        if (args.column.key === 'title') {
          event.preventGridDefault();
          args.selectCell(true);
        }
      }}
    />
  );
}
