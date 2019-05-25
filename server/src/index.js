import dotenv from 'dotenv';
dotenv.config();

import Koa from 'koa';
import { app } from './App';
import sync from '../db/sync';

sync()
  .then(() => {
    app.listen(8000);
  });

