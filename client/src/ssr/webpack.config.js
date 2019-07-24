const path = require('path');
const CircularDependencyPlugin = require('circular-dependency-plugin')

module.exports = (env, argv) => {
  const mode = argv.mode;
  const entry = {
    index: './src/ssr/index.js',
  };

  return {
    // mode: mode || 'development',
    mode: 'production',
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
              plugins: [
                '@babel/plugin-proposal-object-rest-spread',
              ],
              presets: [
                '@babel/react',
              ],
            },
          },
        },
        {
        test: /\.css$/,
        use: [
          'isomorphic-style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
        ]
      },

        {
          test: /\.svg$/,
          loader: 'svg-inline-loader'
        }
      ],
    },
    optimization: {
      minimize: false,
    },
    plugins: [
      new CircularDependencyPlugin({
        // exclude detection of files based on a RegExp
        exclude: /a\.js|node_modules/,
        // add errors to webpack instead of warnings
        failOnError: true,
        // set the current working directory for displaying module paths
        cwd: process.cwd(),
      }),
    ],
    resolve: {
      modules: [path.resolve(__dirname, '/home/soonoo/dev/committrs/client/src'), 'node_modules'],
    },
  }
};

