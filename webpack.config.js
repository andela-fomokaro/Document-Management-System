const debug = process.env.NODE_ENV !== 'production';
const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: path.join(__dirname, '/client/index.js'),
  output: {
    path: path.join(__dirname, '/client/public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: 'babel-loader'
      },
      { test: /(\.css)$/, loaders: ['style-loader', 'css-loader'] },
      { test: /\.scss$/, loaders: ['style-loader', 'css-loader', 'sass-loader'] },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader' },
      {
        test: /\.(jpg|png|svg)$/,
        loader: 'babel-loader',
        options: {
          limit: 25000,
        }
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
};
