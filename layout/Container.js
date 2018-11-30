import React from 'react';

export default function Container({children}) {
  return (
    <div className="container-fluid top-space">
      <div className="row">
        <div className="col-md-2 top-space" role="complementary">
        </div>
        <div className="col-md-10">
          {children}
        </div>
      </div>
    </div>
  );
}

