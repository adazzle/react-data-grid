export class DragTestSource {
  constructor(item) {
    this.item = item;
    this.didCallBeginDrag = false;
  }

  beginDrag() {
    return this.item;
  }

  canDrag() {
    return true;
  }

  isDragging(monitor, handle) {
    return handle === monitor.getSourceId();
  }

  endDrag() { }

}
