import React from 'react';

export default function Wrapper({ title, children }) {
  return (
    <div className="example">
      <h1>{title}</h1>
      {children}
    </div>
  );
}
