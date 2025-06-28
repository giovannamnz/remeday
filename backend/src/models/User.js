// backend/src/models/User.js
const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String
    // não é required para usuários OAuth
  },
  oauth: {
    googleId: {
      type: String,
      default: null
    },
    appleId: {
      type: String,
      default: null
    }
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  termsAccepted: {
    type: Boolean,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = model('User', UserSchema);
