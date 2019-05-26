import dotenv from 'dotenv';
dotenv.config();

import Koa from 'koa';
import { app } from './App';

app.listen(8000);

