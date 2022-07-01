const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  nickname: {type: String, required: true, unique: true},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: {type: String, required: true},
  resetPasswordNumber:{type: Number, required:false},
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);