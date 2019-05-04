import { setup } from './utils';

describe('<ReactDataGrid />', () => {
  it('should render', () => {
    const { container } = setup();
    expect(container.querySelector('.react-grid-Container')).not.toBeNull();
  });
});
