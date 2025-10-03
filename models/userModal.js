const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    maxLength: 20,
    required: [true, 'A user must have a name'],
  },

  email: {
    type: String,
    required: [true, 'A user must have a email'],
    unique: true,
    lowercase: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'Please enter a valid email',
    },
  },

  role: {
    type: String,
    enum: ['user', 'guide', 'lead-guide', 'admin'],
    default: 'user',
  },

  password: {
    type: String,
    minLength: 6,
    required: [true, 'A user must have a password'],
    validate: {
      validator: (password) => validator.isStrongPassword(password),
      message: 'Please enter a strong password',
    },
  },

  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords don't match.",
    },
  },
  passwordChangedAt: Date,

  photo: {
    type: String,
    validate: {
      validator: (url) => validator.isURL(url),
      message: 'Please enter a valid URL',
    },
  },
});

////////////////////////////////////////////////////
// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 8);
  this.passwordConfirm = undefined;
  next();
});
////////////////////////////////////////////////////

// To update passwordChangedAt property for the user
userSchema.methods.isPasswordCorrect = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

//To check if user changed password after the token is issued
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10,
    );
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
