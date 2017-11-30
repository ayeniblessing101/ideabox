import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

mongoose.Promise = global.Promise;

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    trim: true,
    required: 'Please enter your firstname!',
  },
  lastname: {
    type: String,
    trim: true,
    required: 'Please enter your lastname!',
  },
  username: {
    type: String,
    trim: true,
    required: 'Please enter your username!',
  },
  email: {
    type: String,
    trim: true,
    required: 'Please enter your email!',
  },
  password: {
    type: String,
    trim: true,
    required: 'Please enter your password!',
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

UserSchema.pre('save', function hashPassword(next) {
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

export default mongoose.model('User', UserSchema);
