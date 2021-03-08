export declare function stopPropagation(event: React.SyntheticEvent): void;
export declare function wrapEvent<E extends React.SyntheticEvent>(ourHandler: React.EventHandler<E>, theirHandler: React.EventHandler<E> | undefined): (event: E) => void;
