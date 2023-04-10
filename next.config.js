import withLinaria from 'next-with-linaria';

/** @type {import('next-with-linaria').LinariaConfig} */
const config = {
  experimental: {
    appDir: true
  },
  linaria: {
    preprocessor: 'none'
  },
  output: 'export'
};

export default withLinaria(config);
