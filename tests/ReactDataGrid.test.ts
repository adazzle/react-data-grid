import { setup } from './utils';

test('rendering <ReactDataGrid /> should work', () => {
  const { container } = setup();
  expect(container.querySelector('.react-grid-Container')).not.toBeNull();
});
