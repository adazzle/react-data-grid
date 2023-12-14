import { css } from '@linaria/core';

import type { Row } from '../AllFeatures';

const avatarClassname = css`
  margin: auto;
  background-size: 100%;
  block-size: 28px;
  inline-size: 28px;
`;

export function renderAvatar({ row }: { row: Row }) {
  return <div className={avatarClassname} style={{ backgroundImage: `url(${row.avatar})` }} />;
}
