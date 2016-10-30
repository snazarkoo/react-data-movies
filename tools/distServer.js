import express from 'express';
import path from 'path';
import open from 'open';
import compression from 'compression';
import {apiServer} from '../server/apiServer';
import React from 'react';
import { renderToString } from 'react-dom/server';
import NotFoundPage from '../src/components/notFound/NotFoundPage';

/*eslint-disable no-console */

const port = process.env.PORT || 3000;
const app = express();

app.use(express.static(path.join( __dirname, '../src/assets')));
app.use(compression());
app.use(express.static('dist'));
apiServer(app);
app.set('view engine', 'ejs');

app.get(['/movies', '/', '/movie/:id'], function(req, res, next) {
  res.sendFile(path.join( __dirname, '../src/index.html'));
});

//Server side render
app.get('*', function(req, res, next) { 
  const NotFoundPageCompenent = React.createElement(NotFoundPage);
  const reactHtml = renderToString(NotFoundPageCompenent);
  res.render(path.join( __dirname, '../src/indexSer.ejs'), {reactOutput: reactHtml});
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});
