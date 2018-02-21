import { List } from 'immutable';

import isEmptyArray from './isEmptyArray';
import isEmptyObject from './isEmptyObject';
import isFunction from './isFunction';
import isImmutableCollection from './isImmutableCollection';
import getMixedTypeValueRetriever from './mixedTypeValueRetriever';
import isColumnsImmutable from './isColumnsImmutable';
import isImmutableMap from './isImmutableMap';

const last = (arrayOrList) => {
  if (arrayOrList == null) {
    throw new Error('arrayOrCollection is null');
  }

  if (List.isList(arrayOrList)) {
    return arrayOrList.last();
  }

  if (Array.isArray(arrayOrList)) {
    return arrayOrList[arrayOrList.length - 1];
  }

  throw new Error('Cant get last of: ' + typeof (arrayOrList));
};

export {
  isEmptyArray,
  isEmptyObject,
  isFunction,
  isImmutableCollection,
  getMixedTypeValueRetriever,
  isColumnsImmutable,
  isImmutableMap,
  last
};
