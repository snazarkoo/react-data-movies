import webpack from 'webpack';
import path from 'path';

export default {
  devtool: 'source-map',
  noInfo: false,
  entry: [
    'eventsource-polyfill', // necessary for hot reloading with IE
    'webpack-hot-middleware/client?reload=true', //note that it reloads the page if hot module reloading fails.
    path.resolve(__dirname, 'src/index')
  ],
  target: 'web',
  output: {
    path: __dirname + '/dist', // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    // every request made to 'locahost:3000/api/xxxx' will be proxyfied to 'http://localhost:7000/api/xxxx'
    // proxy: {
    //   "/api/*": {
    //     target: "http://localhost:8000",
    //     secure: false,
    //     rewrite: function(req, options) {
    //       debugger;
    //       //you can handle rewrite here if you need to        
    //     }
    //   }
    // }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      {test: /\.js$/, 
        include: path.join(__dirname, 'src'),
        exclude: /node_modules/, loaders: ['babel']},
      {test: /(\.scss)$/, loaders: ['style', 'css', 'sass']},
      {test: /(\.css)$/, loaders: ['style', 'css']},
      { test: /\.(jpe?g|png|gif|svg)$/i, loader: 'url?limit=10000!img?progressive=true' },
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
      {test: /\.(woff|woff2)$/, loader: "url?limit=10000&mimetype=application/font-woff"}

    ]
  }
};
