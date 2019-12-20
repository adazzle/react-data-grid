import React, { useState, useLayoutEffect } from 'react';
import { Menu, MenuOpen } from '@material-ui/icons';

interface Props {
  title: string;
  children: React.ReactChild;
}

export default function Wrapper({ title, children }: Props) {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  useLayoutEffect(() => {
    // TODO, we can make it following react code style when we clean up all of the examples
    const nav = document.querySelector<HTMLElementTagNameMap['ul']>('#root ul.nav');
    if (!nav) return;
    nav.style.display = isSidebarVisible ? 'block' : 'none';
  }, [isSidebarVisible]);

  return (
    <div className="example">
      <h1 onClick={() => setIsSidebarVisible(!isSidebarVisible)}>
        {isSidebarVisible ? <MenuOpen /> : <Menu />} {title}
      </h1>
      {children}
    </div>
  );
}
