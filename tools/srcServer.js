import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.dev';
import open from 'open';
import httpProxy from 'http-proxy';


/* eslint-disable no-console */

const port = 3000;
const app = express();
const proxy = httpProxy.createProxyServer()
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use("/api/*", function(req, res) {
  console.log('11');
  req.url = req.baseUrl; // Janky hack...
  proxy.web(req, res, {
    target: {
      port: 5000,
      host: "localhost"
    }
  });
})

proxy.on('error', function(e) {
  console.log('Could not connect to proxy, please try again...');
});

app.get('*', function(req, res, next) { 
  console.log('index');
  res.sendFile(path.join( __dirname, '../src/index.html'));
});


app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});
