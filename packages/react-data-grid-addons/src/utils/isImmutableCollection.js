import { Iterable } from 'immutable';

const isImmutableCollection = (objToVerify) => {
  return Iterable.isIterable(objToVerify);
};
export default isImmutableCollection;
