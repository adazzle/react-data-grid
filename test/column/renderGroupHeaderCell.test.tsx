import type { ColumnOrColumnGroup } from '../../src';
import { setup } from '../utils';
import { screen, within } from '@testing-library/react';

interface Row {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  birthdayDay: number;
  birthdayMonth: number;
  birthdayYear: number;
}

test('renderGroupHeaderCell is either undefined or a component', () => {
  const columns: readonly ColumnOrColumnGroup<Row>[] = [
    { key: 'id', name: 'ID' },
    {
      name: 'Full Name',
      renderGroupHeaderCell: ({ column }) => `👤 ${column.name}`,
      children: [
        { key: 'firstName', name: 'Name' },
        { key: 'lastName', name: 'Surname' }
      ]
    },
    { key: 'age', name: 'Age' },
    {
      name: 'Birthday',
      children: [
        { key: 'birthdayDay', name: 'Day' },
        { key: 'birthdayMonth', name: 'Month' },
        { key: 'birthdayYear', name: 'Year' }
      ]
    }
  ];

  setup({ columns, rows: [] });
  const rows = screen.getAllByRole('row');
  expect(rows).toHaveLength(2);
  const groupedHeaders = within(rows[0]).getAllByRole('columnheader');
  const columnHeaders = within(rows[1]).getAllByRole('columnheader');
  expect(groupedHeaders).toHaveLength(2);
  expect(columnHeaders).toHaveLength(7);
  expect(groupedHeaders[0]).toHaveTextContent('👤 Full Name');
  expect(groupedHeaders[1]).toHaveTextContent('Birthday');
});
