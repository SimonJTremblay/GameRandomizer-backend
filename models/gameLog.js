const mongoose = require('mongoose')
let Schema = mongoose.Schema

const logSchema = new Schema ({
    gameId: String,
    gameTitle: String,
    players: [String],
    type: ['COOP', 'TEAMS', 'FFA', 'STORY', 'WIN_LOSE', 'N/A'] ,
    outcome: {},
    datePlayed: Date,
})
const gameLogSchema = new Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    history: [logSchema]
})

// exporting collection schema
module.exports =  mongoose.model('GameLogs', gameLogSchema)