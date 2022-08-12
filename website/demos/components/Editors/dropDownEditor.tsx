import { textEditorClassname } from '../../../../src/editors/textEditor';
import type { EditorProps } from '../../../../src';
import type { Row } from '../../AllFeatures';

const titles = ['Dr.', 'Mr.', 'Mrs.', 'Miss', 'Ms.'] as const;

export default function dropDownEditor({ row, onRowChange }: EditorProps<Row>) {
  return (
    <select
      className={textEditorClassname}
      value={row.title}
      onChange={(event) => onRowChange({ ...row, title: event.target.value }, true)}
      autoFocus
    >
      {titles.map((title) => (
        <option key={title} value={title}>
          {title}
        </option>
      ))}
    </select>
  );
}
