module.exports = {
  presets: [
    ['@babel/env', {
      useBuiltIns: 'entry'
    }],
    '@babel/react'
  ],
  plugins: [
    ['@babel/transform-runtime', { useESModules: true }],
    '@babel/proposal-class-properties'
  ],
  env: {
    test: {
      presets: [
        ['@babel/env', {
          useBuiltIns: 'entry'
        }],
        '@babel/react'
      ],
      plugins: [
        ['@babel/transform-runtime', { useESModules: false }],
        '@babel/proposal-class-properties'
      ]
    }
  }
};
