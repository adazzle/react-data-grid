import React from 'react';
import './rdg-image.less';

interface Props {
  /** image url, used as background-image */
  value: string;
}

export default function ImageFormatter({ value }: Props) {
  return (
    <div className="rdg-image-cell-wrapper">
      <div className="rdg-image-cell" style={{ backgroundImage: `url(${value})` }} />
    </div>
  );
}
