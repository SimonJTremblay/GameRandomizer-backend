const mongoose = require('mongoose')
let Schema = mongoose.Schema

const userSchema = new Schema({
    userName: {
        type: String,
        unique: true,
    },
    email: String,
})

// exporting collection schema
module.exports =  mongoose.model('User', userSchema)