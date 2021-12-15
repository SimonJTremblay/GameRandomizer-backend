import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
  bggId: Number,
  title: { type: String, required: true },
  yearPublished: Number,
  media: {
    thumbnail: String,
    image: String,
  },
  players: {
    min: { type: Number, min: 0 },
    max: { type: Number },
  },
  playtime: {
    min: { type: Number, min: 0 },
    max: { type: Number },
  },
  expansions: [{ id: Number, value: String, owned: { type: Boolean, default: false } }],
  categories: [{ id: Number, value: String }],
  mechanics: [{ id: Number, value: String }],
});

const collectionSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  gameList: [gameSchema],
});

// exporting collection schema
export default mongoose.model('Collection', collectionSchema);
