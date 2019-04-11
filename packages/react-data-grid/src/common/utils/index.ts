// eslint-disable-next-line
declare var Immutable: any;

const isImmutableLoaded = () => typeof Immutable !== 'undefined';

export const isColumnsImmutable = <T>(columns: T) => {
  return isImmutableLoaded() && columns instanceof Immutable.List;
};

export const isEmptyArray = <T>(obj: T) => {
  return Array.isArray(obj) && obj.length === 0;
};

export const isFunction = <T>(functionToCheck: T) => {
  return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
};

export const isEmptyObject = <T>(obj: T) => {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};

export const isImmutableCollection = <T>(objToVerify: T) => {
  return isImmutableLoaded() && Immutable.Iterable.isIterable(objToVerify);
};

export const getMixedTypeValueRetriever = (isImmutable: boolean) => {
  return {
    getValue: isImmutable
      ? (immutable: typeof Immutable, key: string) => immutable.get(key)
      : <T>(item: T, key: keyof T) => item[key]
  };
};

export const isImmutableMap = isImmutableLoaded() ? Immutable.Map.isMap : () => false;

export const last = <T>(arrayOrList: T) => {
  if (arrayOrList == null) {
    throw new Error('arrayOrCollection is null');
  }

  if (Array.isArray(arrayOrList)) {
    return arrayOrList[arrayOrList.length - 1];
  }

  if (isImmutableLoaded() && Immutable.List.isList(arrayOrList)) {
    const list: typeof Immutable = arrayOrList;
    return list.last();
  }

  throw new Error(`Cant get last of: ${typeof arrayOrList}`);
};
