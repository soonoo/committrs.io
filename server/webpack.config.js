const path = require('path');
const WebpackShellPlugin = require('webpack-shell-plugin');

module.exports = (env, argv) => {
  const mode = argv.mode;
  const plugins = [];
  const entry = {
    test: './db/test.js',
  };

  if(mode === 'production') {
    entry.app = './src/App.js';
  } else {
    entry.index = './src/index.js';
    plugins.push(new WebpackShellPlugin({ onBuildStart: 'yarn dev' }));
  }

  return {
    mode: mode || 'development',
    target: 'node',
    node: {
      __dirname: true,
    },
    entry,
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: '[name].js',
      libraryTarget: 'commonjs',
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ["@babel/preset-env"],
              plugins: ['@babel/plugin-transform-async-to-generator'],
            },
          },
        },
      ],
    },
    externals: ['pg', 'sqlite3', 'tedious', 'pg-hstore'],
    optimization: {
      minimize: false,
    },
    plugins,
  }
};

