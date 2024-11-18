import type { Column } from '../../../src';
import { setupNew } from '../utils';

test('key is escaped in query selectors', () => {
  const columns: readonly Column<never>[] = [
    {
      key: '!@#%$#%$#()%$#&\n123234\n',
      name: 'test'
    }
  ];

  expect(() => {
    setupNew({ columns, rows: [] });
  }).not.toThrow();
});
