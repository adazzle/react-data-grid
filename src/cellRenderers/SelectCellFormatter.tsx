import type { RenderCheckboxProps } from '../types';
import { useDefaultRenderers } from '../DataGridDefaultRenderersProvider';

type SharedInputProps = Pick<
  RenderCheckboxProps,
  'aria-label' | 'aria-labelledby' | 'disabled' | 'tabIndex' | 'onClick'
>;

interface SelectCellFormatterProps extends SharedInputProps {
  value: boolean;
  onChange: (value: boolean, isShiftClick: boolean) => void;
}

export function SelectCellFormatter({
  value,
  tabIndex,
  disabled,
  onClick,
  onChange,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy
}: SelectCellFormatterProps) {
  const renderCheckbox = useDefaultRenderers()!.renderCheckbox!;

  return (
    <>
      {renderCheckbox({
        'aria-label': ariaLabel,
        'aria-labelledby': ariaLabelledBy,
        tabIndex,
        disabled,
        checked: value,
        onClick,
        onChange
      })}
    </>
  );
}
