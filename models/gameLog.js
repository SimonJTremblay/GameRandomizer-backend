import mongoose from 'mongoose';

const logSchema = new mongoose.Schema({
  gameId: String,
  gameTitle: String,
  players: [String],
  type: ['COOP', 'TEAMS', 'FFA', 'STORY', 'WIN_LOSE', 'N/A'],
  outcome: {},
  datePlayed: Date,
});

const gameLogSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  history: [logSchema],
});

// exporting collection schema
export default mongoose.model('GameLogs', gameLogSchema);
