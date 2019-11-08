import React, { RefObject, useContext, useEffect } from 'react';
import { DataGridEditorContext, EditorContext } from './NewEditorContainer';
import { EditorProps } from '../..';

const navKeys = new Set(['Enter', 'Tab', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']);

type OnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, preventNavigation?: (e: React.KeyboardEvent<HTMLInputElement>) => boolean) => void;

type DataGridEditorReturnType = [
  OnKeyDown
];

export function useDataGridEditor(ref: RefObject<Element | Text | null | undefined> | undefined): DataGridEditorReturnType {
  const { firstEditorKeyPress, commit, commitCancel, onGridKeyDown } = useContext(DataGridEditorContext) as Required<EditorContext>;

  useEffect(() => {
    if (ref && ref.current) {
      if (ref.current instanceof HTMLElement) {
        ref.current.focus();
      }

      if ((firstEditorKeyPress === 'Enter' || firstEditorKeyPress === null) && ref.current instanceof HTMLInputElement) {
        ref.current.select();
      }
    }
  }, [firstEditorKeyPress, ref]);

  function preventDefaultNavigation(e: React.KeyboardEvent<HTMLInputElement>, preventNavigation?: (e: React.KeyboardEvent<HTMLInputElement>) => boolean): boolean {
    if (!ref) {
      return (preventNavigation && preventNavigation(e)) || false;
    }

    const isCaretAtBeginningOfInput = (): boolean => {
      return ref.current instanceof HTMLInputElement && ref.current.selectionEnd === 0;
    };

    const isCaretAtEndOfInput = (): boolean => {
      return ref.current instanceof HTMLInputElement
        && ref.current.selectionStart === ref.current.value.length;
    };

    if (
      (preventNavigation && preventNavigation(e))
      // prevent event propogation. this disables left cell navigation
      || (e.key === 'ArrowLeft' && !isCaretAtBeginningOfInput())
      // prevent event propogation. this disables right cell navigation
      || (e.key === 'ArrowRight' && !isCaretAtEndOfInput())
    ) {
      e.stopPropagation();
      return true;
    }

    return false;
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>, preventNavigation?: (e: React.KeyboardEvent<HTMLInputElement>) => boolean): void {
    if (!preventDefaultNavigation(e, preventNavigation)) {
      if (navKeys.has(e.key)) {
        commit();
      } else if (e.key === 'Escape') {
        commitCancel();
      }
    }

    onGridKeyDown && onGridKeyDown(e);
  }

  return [onKeyDown];
}

export interface DataGridEditorProps {
  inputRef: React.RefObject<HTMLInputElement | HTMLSelectElement>;
  children({ onKeyDown }: { onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void }): JSX.Element;
}

export function DataGridEditor({ children, inputRef }: DataGridEditorProps) {
  const [onKeyDown] = useDataGridEditor(inputRef);
  return children({ onKeyDown });
}

export interface WrappedEditorProps<TValue, TDependentValue = unknown, TRow = object> extends EditorProps<TValue, TDependentValue, TRow> {
  inputRef: React.RefObject<HTMLInputElement | HTMLSelectElement>;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export function withDataGridEditor<TValue, TDependentValue = unknown, TRow = object>(WrappedComponent: React.ComponentType<WrappedEditorProps<TValue, TDependentValue, TRow>>) {
  function WrappedEditor(props: EditorProps<TValue, TDependentValue, TRow>): JSX.Element {
    const inputRef = React.useRef<HTMLInputElement | HTMLSelectElement>(null);
    const [onKeyDown] = useDataGridEditor(inputRef);
    return <WrappedComponent inputRef={inputRef} onKeyDown={onKeyDown} {...props} />;
  }

  WrappedEditor.displayName = `${WrappedComponent.displayName}_with_rdg_events`;
  return WrappedEditor;
}
