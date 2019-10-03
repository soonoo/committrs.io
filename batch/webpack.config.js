const path = require('path');
const WebpackShellPlugin = require('webpack-shell-plugin');
const { DefinePlugin, SourceMapDevToolPlugin } = require('webpack');

module.exports = (env, argv) => {
  const { mode } = argv;

  const config = {
    mode,
    target: 'node',
    entry: './subscriber/subscriber.js',
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: 'subscriber.bundle.js',
    },
    devtool: 'eval-source-map',
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
        {
          test: /\.js$/,
          use: ['source-map-loader'],
          enforce: 'pre',
        }
      ],
    },
    externals: ['pg', 'sqlite3', 'tedious', 'pg-hstore', 'gcrp'],
    optimization: {
      minimize: false,
    },
    plugins: [
      new DefinePlugin({
        'NODE_ENV': argv || 'development',
      }),
    ],
  };

  if(mode === 'development') {
    config.plugins.push(
      new WebpackShellPlugin({
        onBuildStart: 'yarn dev',
      }),
    );
  }

  return config;
};

