// Third party
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { json } from 'express';
import mongoose from 'mongoose';
// Local
import gameCollectionRouter from './routes/collection-router.js';
import gameLogRouter from './routes/gamelog-router.js';
import userRouter from './routes/user-router.js';

dotenv.config();
const port = process.env.PORT;

const { connect, connection } = mongoose;
const { urlencoded } = bodyParser;

const app = express();
app.use(json());
app.use(cors());

app.use(urlencoded({ extended: true }));

connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('connected to database'));

app.use('/Collection', gameCollectionRouter);

app.use('/User', userRouter);

app.use('/GameLog', gameLogRouter);

app.listen(port, () => console.log(`Server running on port ${port}`));
