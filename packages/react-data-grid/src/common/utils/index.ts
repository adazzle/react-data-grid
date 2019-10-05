import Immutable from 'immutable';

export function isColumnsImmutable(columns: unknown): columns is Immutable.List<unknown> {
  return Immutable.List.isList(columns);
}

export function isEmptyArray(obj: unknown): boolean {
  return Array.isArray(obj) && obj.length === 0;
}

export function isFunction<T>(functionToCheck: T): boolean {
  return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}

export function isEmptyObject<T extends {}>(obj: T): boolean {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}

export function isImmutableCollection<T>(objToVerify: T): boolean {
  return Immutable.Iterable.isIterable(objToVerify);
}

export function getMixedTypeValueRetriever(isImmutable: boolean) {
  return {
    getValue: isImmutable
      ? (immutable: Immutable.Map<string, unknown>, key: string) => immutable.get(key)
      : <T>(item: T, key: keyof T): T[typeof key] => item[key]
  };
}

export const isImmutableMap = Immutable.Map.isMap;
