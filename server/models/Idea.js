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
  category: {
    type: String,
    trim: true,
  },
  user: {
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

// Define our index
IdeaSchema.index({ title: 'text', description: 'text' });

export default mongoose.model('Idea', IdeaSchema);
