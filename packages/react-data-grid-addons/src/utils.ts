export function isEmptyArray(arr: readonly unknown[]): boolean {
  return arr.length === 0;
}

export function isEmptyObject<T extends {}>(obj: T): boolean {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}
