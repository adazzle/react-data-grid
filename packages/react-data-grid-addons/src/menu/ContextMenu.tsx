import React from 'react';
import { ContextMenu } from 'react-contextmenu';

export default function DataGridContextMenu({ children }: { children: React.ReactNode }) {
  return <ContextMenu id="reactDataGridContextMenu">{children}</ContextMenu>;
}
