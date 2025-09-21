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
    isLowerCase: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'please enter  a valid email',
    },
  },
  password: {
    type: String,
    minLength: 6,
    required: [true, 'A user must have a password'],
    unique: [true, 'This password is already taken'],
    validate: {
      validator: (password) => validator.isStrongPassword(password),
      message: 'Please enter a strong password',
    },
    select: false,
  },

  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      type: String,
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords doesn't match.",
    },
  },

  photo: {
    type: String,
    validate: {
      validator: (url) => validator.isURL(url),
      message: 'Please enter  a valid url',
    },
  },
});

////////////////////////////////////////////////////
//Encrypt or HASH the password before saving - creating a new document or updating a document field.
userSchema.pre('save', async function (next) {
  if (this.isModified('password') === false) return next();
  this.password = await bcrypt.hash(this.password, 8);

  //Delete confirm password field
  this.passwordConfirm = undefined;
});
/////////////////////////////////////////////////////////////

userSchema.methods.isPasswordCorrect = async function (
  candidatePassworsd,
  userPassword,
) {
  return await bcrypt.compare(candidatePassworsd, userPassword);
};
const User = new mongoose.model('User', userSchema);

module.exports = User;
