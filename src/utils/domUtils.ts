let size: number | undefined;

export function getScrollbarSize(): number {
  if (size === undefined) {
    const scrollDiv = document.createElement('div');

    scrollDiv.style.position = 'absolute';
    scrollDiv.style.top = '-9999px';
    scrollDiv.style.width = '50px';
    scrollDiv.style.height = '50px';
    scrollDiv.style.overflow = 'scroll';

    document.body.appendChild(scrollDiv);
    size = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    document.body.removeChild(scrollDiv);
  }

  return size;
}

export function preventDefault(event: React.SyntheticEvent) {
  event.preventDefault();
}

export function wrapEvent<E extends React.SyntheticEvent>(ourHandler: React.EventHandler<E>, theirHandler: React.EventHandler<E> | undefined) {
  if (theirHandler === undefined) return ourHandler;

  return function(event: E) {
    ourHandler(event);
    theirHandler(event);
  };
}
