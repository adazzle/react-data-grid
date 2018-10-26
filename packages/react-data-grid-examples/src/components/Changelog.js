import React from 'react';
import ReactMarkdown from 'react-markdown';
import Container from '../layout/Container';
import input from '../../../../Changelog.md';

export default function Changelog() {
  return (
    <Container>
      <ReactMarkdown source={input} />
    </Container>
  );
}


