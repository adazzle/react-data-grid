import createObjectFromProperties from '../createObjectWithProperties';

describe('create Object From Properties', () => {
  it('should create an object with the correct properties', () => {
    const originalObj = {
      a: null,
      b: undefined,
      c: false,
      d: true,
      e: 0,
      f: 1,
      g: '',
      h: 'string',
      ignore: 'me'
    };
    const properties = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'fake'];
    const result = createObjectFromProperties(originalObj, properties);

    expect(result).toEqual({
      a: null,
      b: undefined,
      c: false,
      d: true,
      e: 0,
      f: 1,
      g: '',
      h: 'string'
    });
  });

  it('should create an empty object when requesting no properties', () => {
    const originalObj = { a: 'test' };
    const properties = [];
    const result = createObjectFromProperties(originalObj, properties);

    expect(result).toEqual({});
  });

  it('should create an empty object when requesting properties from an empty source', () => {
    const originalObj = {};
    const properties = ['a'];
    const result = createObjectFromProperties(originalObj, properties);

    expect(result).toEqual({});
  });
});
