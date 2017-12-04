import mongoose from 'mongoose';

const { Schema } = mongoose;

mongoose.Promise = global.Promise;
/**
 * Idea Schema
 */
const IdeaSchema = new Schema({
  title: {
    type: String,
    trim: true,
    unique: true,
    required: 'Title is required!',
  },
  description: {
    type: String,
    trim: true,
    required: 'Description is required!',
  },
  categoryId: {
    type: Number,
    trim: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  ideaType: {
    type: String,
    enum: ['Public', 'Private'],
    default: 'Public',
  },
  modified: { type: Boolean },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model('Idea', IdeaSchema);
