import React from 'react';

interface Option {
  title?: string;
  value?: string;
  text?: string;
}

interface Props {
  options: Array<string | Option>;
  value: string;
}

/**
 * Used for displaying the value of a dropdown (using DropDownEditor) when not editing it.
 * Accepts the same parameters as the DropDownEditor.
*/
export default function DropDownFormatter({ value, options }: Props) {
  const option = options.find(v => typeof v === 'string' ? v === value : v.value === value) || value;

  if (typeof option === 'string') {
    return <div title={option}>{option}</div>;
  }

  const title = option.title || option.value || value;
  const text = option.text || option.value || value;

  return <div title={title}>{text}</div>;
}
