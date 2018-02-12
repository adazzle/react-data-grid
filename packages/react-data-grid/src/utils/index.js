import { List } from 'immutable';

module.exports = {
  isEmptyArray: require('./isEmptyArray'),
  isEmptyObject: require('./isEmptyObject'),
  isFunction: require('./isFunction'),
  isImmutableCollection: require('./isImmutableCollection'),
  getMixedTypeValueRetriever: require('./mixedTypeValueRetriever'),
  isColumnsImmutable: require('./isColumnsImmutable'),
  isImmutableMap: require('./isImmutableMap'),
  last: (arrayOrList) => {
    if (arrayOrList == null) {
      throw new Error('arrayOrCollection is null');
    }

    if (List.isList(arrayOrList)) {
      return arrayOrList.last();
    }

    if (Array.isArray(arrayOrList)) {
      return arrayOrList[arrayOrList.length - 1];
    }

    throw new Error('Cant get last of: ' + typeof(arrayOrList));
  }
};
