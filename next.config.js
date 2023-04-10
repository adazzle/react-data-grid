import withLinaria from 'next-with-linaria';

const config = {
  experimental: {
    appDir: true,
    forceSwcTransforms: true
  },
  linaria: {
    preprocessor: 'none'
  },
  output: 'export'
};

export default withLinaria(config);
