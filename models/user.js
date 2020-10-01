/*eslint-env es6*/
const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    validate: {
      validator: function(v) {
        return /^(https?:\/\/)?([\w-]{1,32}\.[\w-]{1,32})[^\s@]*$/.test(v);
      },
      message: `error`
    },
    required: true,
  },
  // email: {
  //   type: String,
  //   unique: true,
  //   required: true,
  //   validate: {
  //     validator: (v) => isEmail(v),
  //     message: 'Неправильный формат почты',
  //   },
  // },
  // password: {
  //   type: String,
  //   required: true,
  //   minlength: 8,
  // },
});

module.exports = mongoose.model('userModel', userSchema); 