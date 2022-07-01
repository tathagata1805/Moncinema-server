const { json } = require('body-parser');
const Comment = require('../models/Comment');

// current timestamp
let ts = Date.now();

let date_ob = new Date(ts);
let date = date_ob.getDate();
let month = date_ob.getMonth() + 1;
let year = date_ob.getFullYear();
let hours = date_ob.getHours();
let minutes = date_ob.getMinutes();



exports.comment = (req,res) =>{
    Comment.find({movie_id:req.params.movie_id},(error,data) =>{
        if(error){
           return res.status(500).json({
                message:'Server error'
            })
        }
        if(!data){ 
            return res.status(401).json({
                message:'No comments for this movie'
            })
        }
        res.status(201).json({data})
    })

}


exports.newComment = (req,res) =>{
    if(!req.body.comment){
        return res.status(401).json({message: 'Add Comment.'})
    }
    const comment = new Comment({
        author: req.body.author,
        author_id: req.body.author_id,
        comment: req.body.comment,
        date:date + "-" + month + "-" + year + " " + hours + ":" + minutes , // print date & time in DD-MM-YYYY hours:minutes format
        movie_id: req.body.movie_id,
        avatar:req.body.avatar
    })
    comment.save()
    .then(() => res.status(201).json({
        message: 'Comment created !'
    }))
    .catch((error) => res.status(500).json({
        message: 'Server error.',
        error
    }))
}

exports.deleteComment = (req,res) =>{
    Comment.findOne({_id: req.body._id})
    .then((comment) => {
        if(comment.author_id != req.body.author_id){
            return res.status(401).json({
                message:"Wrong user"
            })
        }
    Comment.findOneAndDelete({ _id: req.body._id  })
        .exec((err) => {
            if(err)
                return res.status(500).json({
                    message: 'There was an error deleting the comment'
                })
            res.status(200).json({
                message: 'Comment deleted'
            })
        })
    })
    
    
}

exports.updateComment = (req,res) =>{
    if(!req.body.comment){
        return res.status(401).json({
            message: 'Please write a comment.'
        })
    }
    Comment.findOne({_id: req.body._id})
    .then((comment) => {
        if(comment.author_id != req.body.author_id){
            return res.status(401).json({
                message:"Wrong user"
            })
        }
        Comment.updateOne({_id:req.body._id},{$set: {
            "comment": req.body.comment,
            "date": date + "-" + month + "-" + year + " " + hours + ":" + minutes,
        }})
        .exec((err) => {
            if(err)
                return res.status(500).json({
                    message: 'There was an error updating the comment'
                })
            res.status(200).json({
                message: 'Comment modified'
            })
        })
    })
    
    
}