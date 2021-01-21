export function stopPropagation(event: React.SyntheticEvent) {
  event.stopPropagation();
}

export function wrapEvent<E extends React.SyntheticEvent>(ourHandler: React.EventHandler<E>, theirHandler: React.EventHandler<E> | undefined) {
  if (theirHandler === undefined) return ourHandler;

  return function(event: E) {
    ourHandler(event);
    theirHandler(event);
  };
}
