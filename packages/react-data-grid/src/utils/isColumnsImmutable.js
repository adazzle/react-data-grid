export default function isColumnsImmutable(columns: Array<Column>) {
  return (typeof Immutable !== 'undefined' && (columns instanceof Immutable.List));
}
