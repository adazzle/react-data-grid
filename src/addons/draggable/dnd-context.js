import { DragDropManager } from 'dnd-core';
import HTML5Backend from 'react-dnd-html5-backend';

export default function getDndContext(context) {
  return context.dragDropManager || new DragDropManager(HTML5Backend);
}
