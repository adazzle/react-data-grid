import { setup } from './utils';

test('rendering <DataGrid /> should work', () => {
  const { container } = setup();
  expect(container.querySelector('.rdg-root')).not.toBeNull();
});
