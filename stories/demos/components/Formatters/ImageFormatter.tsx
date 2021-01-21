import { css } from '@linaria/core';

const wrapperClassname = css`
display: flex;
justify-content: space-around;
`;

const imageCellClassname = css`
  background: #efefef;
  background-size: 100%;
  display: inline-block;
  height: 28px;
  width: 28px;
  vertical-align: middle;
  background-position: center;
`;

interface Props {
  /** image url, used as background-image */
  value: string;
}

export function ImageFormatter({ value }: Props) {
  return (
    <div className={wrapperClassname}>
      <div className={imageCellClassname} style={{ backgroundImage: `url(${value})` }} />
    </div>
  );
}
