export default function isColumnsImmutable(columns) {
  return (typeof Immutable !== 'undefined' && (columns instanceof Immutable.List));
}
