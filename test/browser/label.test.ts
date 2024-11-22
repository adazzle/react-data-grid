import { getGrid, setup } from './utils';

test('should set label and description', () => {
  setup({
    rows: [],
    columns: [],
    'aria-label': 'label',
    'aria-labelledby': 'labelledby',
    'aria-description': 'description',
    'aria-describedby': 'describedby',
    'data-testid': 'testid',
    'data-custom': 'custom'
  });

  const grid = getGrid().element();
  expect(grid).toHaveAttribute('aria-label', 'label');
  expect(grid).toHaveAttribute('aria-labelledby', 'labelledby');
  expect(grid).toHaveAttribute('aria-description', 'description');
  expect(grid).toHaveAttribute('aria-describedby', 'describedby');
  expect(grid).toHaveAttribute('data-testid', 'testid');
  expect(grid).toHaveAttribute('data-custom', 'custom');
});
