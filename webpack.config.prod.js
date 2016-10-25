import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production')
};

export default {
  noInfo: false,
  entry: path.resolve(__dirname, 'src/index'),
  target: 'web',
  output: {
    path: __dirname + '/dist', // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './dist'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin(GLOBALS),
    new ExtractTextPlugin('styles.css'),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ],
  module: {
    loaders: [{
        test: /\.js$/,
        include: path.join(__dirname, 'src'),
        exclude: /node_modules/,
        loaders: ['babel']
      }, {
        test: /(\.scss)$/,
        loader: ExtractTextPlugin.extract('style', 'css!sass')
      }, {
        test: /(\.css)$/,
        loader: ExtractTextPlugin.extract('css')
      }, {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'url?limit=10000!img?progressive=true'
      }, {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff'
      }, {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff'
      }, {
        test: /\.(woff|woff2)$/,
        loader: 'url?limit=10000&mimetype=application/font-woff'
      }

    ]
  }
};