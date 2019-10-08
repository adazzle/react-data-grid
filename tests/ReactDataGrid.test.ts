import { setup } from './utils';

test('rendering <ReactDataGrid /> should work', () => {
  const { container } = setup();
  expect(container.querySelector('.rdg-root')).not.toBeNull();
});
