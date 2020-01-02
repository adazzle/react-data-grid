import React from 'react';
import './ImageFormatter.less';

interface Props {
  /** image url, used as background-image */
  value: string;
}

export function ImageFormatter({ value }: Props) {
  return <div className="rdg-image" style={{ backgroundImage: `url(${value})` }} />;
}
