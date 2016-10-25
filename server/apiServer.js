import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import {config} from './config'; // get our config file
import User from './models/userModel'; // get our mongoose model
import routes from './routes';

export function apiServer(app) {
  mongoose.connect(config.DB); // connect to database
  app.use(morgan('dev'));

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  routes(app);
}