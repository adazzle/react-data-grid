import React from 'react';
import { ContextMenu } from 'react-contextmenu';

export default function ReactDataGridContextMenu({ children }: { children: React.ReactNode }) {
  return <ContextMenu id="reactDataGridContextMenu">{children}</ContextMenu>;
}
