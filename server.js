const express = require('express');
const bodyParser= require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors');

require('dotenv').config()

const app = express();
app.use(express.json())
app.use(cors());

app.use(bodyParser.urlencoded({extended: true}))

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to database'))


const gameCollectionRouter = require('./routes/collection-router')
app.use('/Collection', gameCollectionRouter)

const userRouter = require('./routes/user-router')
app.use('/User', userRouter)

app.listen(3000, () => console.log('server started'))