import RowGrouperResolver from '../RowGrouperResolver';
import Immutable from 'immutable';

describe('RowGrouperResolver', () => {
  describe('initRowsCollection', () => {
    it('returns array if Immutable not defined', () => {
      const resolver = new RowGrouperResolver(false);
      expect(resolver.initRowsCollection()).toEqual(jasmine.any(Array));
    });

    it('returns Immutable List if Immutable defined', () => {
      const resolver = new RowGrouperResolver(true);
      expect(resolver.initRowsCollection()).toEqual(
        jasmine.any(Immutable.List)
      );
    });
  });
});
