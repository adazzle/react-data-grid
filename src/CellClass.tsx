import React, {PureComponent, RefObject} from 'react';
import { css } from '@linaria/core';

import { getCellStyle, getCellClassname, isCellEditable } from './utils';
import type { CellRendererProps } from './types';

// import { useRovingCellRef } from './hooks';

const cellCopied = css`
  background-color: #ccccff;
`;

const cellCopiedClassname = `rdg-cell-copied ${cellCopied}`;

const cellDraggedOver = css`
  background-color: #ccccff;

  &.${cellCopied} {
    background-color: #9999ff;
  }
`;

const cellDraggedOverClassname = `rdg-cell-dragged-over ${cellDraggedOver}`;

// eslint-disable-next-line react/no-unsafe
export default class Cell<R, SR> extends PureComponent<CellRendererProps<R, SR>> {
    ref :RefObject<HTMLDivElement> = React.createRef<HTMLDivElement>();
    isChildFocused = false;

    constructor(props:Readonly<CellRendererProps<R, SR>>) {
        super(props);
        this.importProps(props);
    }

    importProps(props:Readonly<CellRendererProps<R, SR>>)
    {
        if  (!props.isCellSelected) {
            this.isChildFocused = false;
            return;
        }
        if ( this.isChildFocused ) {
            this.forceUpdate();
            return;
        }
        this.ref.current?.focus({ preventScroll: true });
    }

    UNSAFE_componentWillUpdate(nextProps: Readonly<CellRendererProps<R, SR>>): void {
        this.importProps(nextProps);
    }

    handleFocus = (event: React.FocusEvent<HTMLDivElement>) =>{
        if (event.target !== this.ref.current) {
            this.isChildFocused = true;
        }
    };
    selectCellWrapper(openEditor?: boolean | null) {
        this.props.selectCell(this.props.row, this.props.column, openEditor);
    }

    handleClick= () =>{
        this.selectCellWrapper(this.props.column.editorOptions?.editOnClick);
        this.props.onRowClick?.(this.props.row, this.props.column);
    };

    handleContextMenu=() =>{
        this.selectCellWrapper();
    };

    handleDoubleClick= () =>{
        this.selectCellWrapper(true);
        this.props.onRowDoubleClick?.(this.props.row, this.props.column);
    };

    render() {
        let {
            column,
            colSpan,
            isCellSelected,
            isCopied,
            isDraggedOver,
            row,
            dragHandle,
            onRowClick,
            onRowDoubleClick,
            onRowChange,
            selectCell,
            ...props
        } = this.props;


        const isFocused = isCellSelected && !this.isChildFocused;
        const tabIndex = isFocused ? 0 : -1;

        // const {ref, tabIndex, onFocus} = useRovingCellRef(isCellSelected);

        const {cellClass} = column;
        const className = getCellClassname(
            column,
            {
                [cellCopiedClassname]: isCopied,
                [cellDraggedOverClassname]: isDraggedOver
            },
            typeof cellClass === 'function' ? cellClass(row) : cellClass
        );


        return (
            <div
                role="gridcell"
                aria-colindex={column.idx + 1} // aria-colindex is 1-based
                aria-selected={isCellSelected}
                aria-colspan={colSpan}
                aria-readonly={!isCellEditable(column, row) || undefined}
                ref={this.ref}
                tabIndex={tabIndex}
                className={className}
                style={getCellStyle(column, colSpan)}
                onClick={this.handleClick}
                onDoubleClick={this.handleDoubleClick}
                onContextMenu={this.handleContextMenu}
                onFocus={this.handleFocus}
                {...props}
            >
                {!column.rowGroup && (
                    <>
                        <column.formatter
                            column={column}
                            row={row}
                            isCellSelected={isCellSelected}
                            onRowChange={onRowChange}
                        />
                        {dragHandle}
                    </>
                )}
            </div>
        );
    }
}

//export default memo(Cell) as <R, SR>(props: CellRendererProps<R, SR>) => JSX.Element;
