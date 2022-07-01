const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
  author: { type: String, required: true },
  author_id: {type:String,required:true},
  comment: { type: String, required: true },
  date:{type:String,required:true},
  movie_id:{type: Number, required:true},
  avatar:{type:String,required:true}
});


module.exports = mongoose.model('Comment', commentSchema);