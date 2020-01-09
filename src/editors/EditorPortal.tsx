import React, { useState, useLayoutEffect } from 'react';
import ReactDOM from 'react-dom';

interface Props {
  children: React.ReactNode;
  target: Element;
}

export default function EditorPortal({ target, children }: Props) {
  // Keep track of when the modal element is added to the DOM
  const [isMounted, setIsMounted] = useState(false);

  useLayoutEffect(() => {
    setIsMounted(true);
  }, []);

  // Don't render the portal until the component has mounted,
  // So the portal can safely access the DOM.
  if (!isMounted) {
    return null;
  }

  return ReactDOM.createPortal(children, target);
}
