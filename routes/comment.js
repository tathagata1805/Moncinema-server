const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comment');

//verify user is connected with jwt authentification
const auth = require('../middleware/auth');

router.get('/:movie_id',auth, commentCtrl.comment) //Get comment for a specific movie
router.post('/newComment',auth, commentCtrl.newComment) //POST method to add a comment on a movie
router.delete('/deleteComment',auth, commentCtrl.deleteComment) //DELETE method to remove a comment on a movie
router.post('/updateComment',auth, commentCtrl.updateComment) //POST method to modify a comment

module.exports = router;