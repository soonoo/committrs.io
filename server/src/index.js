import dotenv from 'dotenv';
dotenv.config();

import Koa from 'koa';
import fetch from 'node-fetch';
import jwt from 'jsonwebtoken';
import app from './App';
import sync from '../db/sync';

// sync db and start server
sync()
  .then(() =>{
    app.listen(8000);
  });

