const path = require('path');
const WebpackShellPlugin = require('webpack-shell-plugin');

module.exports = {
  mode: 'development',
  target: 'node',
  node: {
    __dirname: true,
  },
  entry: {
    main: './src/index.js',
    test: './db/test.js',
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/transform-runtime'],
          },
        },
      },
    ],
  },
  externals: ['pg', 'sqlite3', 'tedious', 'pg-hstore'],
  plugins: [
    new WebpackShellPlugin({ onBuildStart: 'yarn dev' }),
  ],
};

