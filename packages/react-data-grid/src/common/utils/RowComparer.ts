import { RowRendererProps } from '../types';

export default function shouldRowUpdate<R>(nextProps: RowRendererProps<R>, currentProps: RowRendererProps<R>) {
  return currentProps.columns !== nextProps.columns
    || nextProps.row !== currentProps.row
    || currentProps.colOverscanStartIdx !== nextProps.colOverscanStartIdx
    || currentProps.colOverscanEndIdx !== nextProps.colOverscanEndIdx
    || currentProps.isRowSelected !== nextProps.isRowSelected
    || currentProps.isScrolling !== nextProps.isScrolling
    || nextProps.height !== currentProps.height
    || currentProps.extraClasses !== nextProps.extraClasses;
}
