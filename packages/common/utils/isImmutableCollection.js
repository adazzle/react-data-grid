import { Iterable } from 'immutable';

export default function isImmutableCollection(objToVerify) {
  return Iterable.isIterable(objToVerify);
};


