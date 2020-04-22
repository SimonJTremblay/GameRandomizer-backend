const mongoose = require('mongoose')

const collectionSchema = new mongoose.Schema({
    user: {
        type: Object,
        required: true,
    },
    gameList: {
        type: Array,
        required: true,
    }
})

// exporting collection schema
module.exports = mongoose.model('Collection', collectionSchema)