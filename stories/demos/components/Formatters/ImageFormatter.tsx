import './rdg-image.less';

interface Props {
  /** image url, used as background-image */
  value: string;
}

export function ImageFormatter({ value }: Props) {
  return (
    <div className="rdg-image-cell-wrapper">
      <div className="rdg-image-cell" style={{ backgroundImage: `url(${value})` }} />
    </div>
  );
}
