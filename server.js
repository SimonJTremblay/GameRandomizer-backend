const express = require('express');
const bodyParser= require('body-parser')
const app = express();
const mongoose = require('mongoose')

require('dotenv').config()

app.use(bodyParser.urlencoded({extended: true}))

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to database'))

app.use(express.json())

const gameCollectionRouter = require('./routes/gameCollection')
app.use('/Collection', gameCollectionRouter)

app.listen(3000, () => console.log('server started'))