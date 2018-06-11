const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const {
  passwordValidators,
  emailValidators,
} = require('./validators');

/* User schema */
const User = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    validate: emailValidators,
  },
  profilePicture: {
    type: String,
  },
}, { timestamps: true });

/**
 * Plugins
 */
User.plugin(uniqueValidator, {
  message: 'user/{PATH}-already-in-use'
});

module.exports = mongoose.model('users', User);
