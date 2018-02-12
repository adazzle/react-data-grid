import { createScrollShim } from '../scrollUtils';

describe('scrollUtils', () => {
  it('should create a scroll shim with correct size and class', () => {
    const size = { width: 5, height: 10 };
    const shim = createScrollShim(size);

    expect(shim.style.width).toBe('5px');
    expect(shim.style.height).toBe('10px');
    expect(shim.className.indexOf('react-grid-ScrollShim')).not.toBe(-1);
  });
});
