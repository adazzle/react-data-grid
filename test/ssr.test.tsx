/** @jest-environment node */
import { renderToString } from 'react-dom/server';
import DataGrid from '../src';

const columns = [
  { key: 'id', name: 'ID' },
  { key: 'title', name: 'Title' }
];

const rows = [
  { id: 0, title: 'Example' },
  { id: 1, title: 'Demo' }
];

function App() {
  return <DataGrid columns={columns} rows={rows} />;
}

test('basic SSR support', () => {
  // make sure we're not running in the JSDOM environment
  expect(globalThis.window).not.toBeDefined();

  const html = renderToString(<App />);
  expect(html).not.toHaveLength(0);
});
