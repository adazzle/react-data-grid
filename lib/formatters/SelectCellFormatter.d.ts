declare type SharedInputProps = Pick<React.InputHTMLAttributes<HTMLInputElement>, 'disabled' | 'tabIndex' | 'onClick' | 'aria-label' | 'aria-labelledby'>;
interface SelectCellFormatterProps extends SharedInputProps {
    isCellSelected?: boolean;
    value: boolean;
    onChange: (value: boolean, isShiftClick: boolean) => void;
}
export declare function SelectCellFormatter({ value, tabIndex, isCellSelected, disabled, onClick, onChange, 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledBy }: SelectCellFormatterProps): JSX.Element;
export {};
