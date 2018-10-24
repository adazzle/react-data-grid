import React from 'react';
import ReactMarkdown from 'react-markdown';
import input from '../../../../Changelog.md';

export default function Changelog() {
  return (
    <div className="container-fluid top-space">
      <div className="row">
        <div className="col-md-2 top-space" role="complementary">        
        </div>
        <div className="col-md-10">
          <ReactMarkdown source={input}/>
        </div>
      </div>
    </div>
  );
};
