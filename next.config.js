import withLinaria from 'next-with-linaria';

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
