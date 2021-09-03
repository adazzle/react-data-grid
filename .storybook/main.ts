import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import stylis from 'stylis';

stylis.set({ prefix: false });

// TODO: remove `target` https://github.com/storybookjs/storybook/issues/15882
const target = 'browserslist:browserslist config, not maintained node versions';

// TODO: remove `.storybook/package.json` https://github.com/storybookjs/storybook/issues/15335

export default {
  stories: ['../stories/**/*.story.*'],
  reactOptions: {
    fastRefresh: true,
    strictMode: true
  },
  core: {
    builder: 'webpack5'
  },
  managerWebpack(config) {
    config.target = target;
    return config;
  },
  webpackFinal(config, { configType }) {
    config.target = target;
    const isProd = configType === 'PRODUCTION';

    config.module.rules = [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: { cacheDirectory: !isProd }
          },
          {
            loader: '@linaria/webpack-loader',
            options: { sourceMap: !isProd }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [isProd ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader']
      }
    ];

    config.plugins.push(
      new MiniCssExtractPlugin({
        filename: isProd ? '[name].[contenthash].css' : '[name].css',
        chunkFilename: isProd ? '[id].[contenthash].css' : '[id].css',
        ignoreOrder: true
      })
    );

    return config;
  }
};
