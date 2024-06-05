import express from 'express';
// const path = require('path');
import path from 'path';
import connectDB from './database.ts';

const app = express();

connectDB();

app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../client/index.html')))

app.listen(3000, () => console.log('server is listening on port 3000'));
