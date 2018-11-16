const isImmutableLoaded = () => typeof Immutable !== 'undefined';

export const isColumnsImmutable = (columns) => {
  return isImmutableLoaded() && columns instanceof Immutable.List;
};

export const isEmptyArray = (obj) => {
  return Array.isArray(obj) && obj.length === 0;
};

export const isFunction = (functionToCheck) => {
  let getType = {};
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
};

export const isEmptyObject = (obj) => {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};

export const isImmutableCollection = objToVerify => {
  return isImmutableLoaded() && Immutable.Iterable.isIterable(objToVerify);
};

export const getMixedTypeValueRetriever = (isImmutable) => {
  let retObj = {};
  const retriever = (item, key) => { return item[key]; };
  const immutableRetriever = (immutable, key) => { return immutable.get(key); };

  retObj.getValue = isImmutable ? immutableRetriever : retriever;

  return retObj;
};

export const isImmutableMap = isImmutableLoaded() ? Immutable.Map.isMap : () => false;

export const last = arrayOrList => {
  if (arrayOrList == null) {
    throw new Error('arrayOrCollection is null');
  }

  if (isImmutableLoaded() && Immutable.List.isList(arrayOrList)) {
    return arrayOrList.last();
  }

  if (Array.isArray(arrayOrList)) {
    return arrayOrList[arrayOrList.length - 1];
  }

  throw new Error('Cant get last of: ' + typeof (arrayOrList));
};
