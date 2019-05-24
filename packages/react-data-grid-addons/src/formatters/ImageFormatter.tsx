import React from 'react';

interface Props {
  /** image url, used as background-image */
  value: string;
}

export default function ImageFormatter({ value }: Props) {
  return <div className="react-grid-image" style={{ backgroundImage: `url(${value})` }} />;
}
