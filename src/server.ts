require('./config/config');
import express from 'express';
import { Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import Routes from './routes';

// const routers = require('./routes/index');
const app = express();
const port = 8888;

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(Routes);

mongoose.connect(process.env.URLDB);

app.get('/', (req: Request, res: Response) => {
  res.send('Application works ji ji!');
});
app.listen(port, () => {
  console.log(`Application started on port ${ port }`);
});