import mongoose from 'mongoose';

const { model, Schema } = mongoose;

const userSchema = new Schema({
  userName: {
    type: String,
    unique: true,
  },
  email: String,
});

// exporting collection schema
export default model('User', userSchema);
