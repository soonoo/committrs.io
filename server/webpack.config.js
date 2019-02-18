const path = require('path');

module.exports = {
  mode: 'development',
  target: 'node',
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
};

