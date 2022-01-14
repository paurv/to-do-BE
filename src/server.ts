require('./config/config');
import express from 'express';
import { Request, Response } from 'express';
import * as bodyParser from 'body-parser';

// import mongoose = require('mongoose')
import mongoose from 'mongoose';

import cors from 'cors';

import Routes from './routes';

// const routers = require('./routes/index');
const app = express();
const port = process.env.PORT;

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(Routes);

mongoose.connect(process.env.URLDB);

app.get('/', (req: Request, res: Response) => {
  res.send('Application works');
});
app.listen(port, () => {
  console.log(`Application started on port ${ port }`);
});