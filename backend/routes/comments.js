const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentControllers');


router.post('/post/:id/user/:id', commentController.createComment);
router.get('/', commentController.getAllcomments);
router.get('/post/:id', commentController.getAllcommentsbypost);
router.get('/user/:id', commentController.getAllcommentsbyuser);
router.get('/post/:id/user/:id', commentController.getcommentbyPostandUser);
router.get('/post/:id', commentController.sortCommentbyTime);
router.delete('/', commentController.deleteAllcomment);
router.delete('/post/:id', commentController.deletecommentbypostuser);
router.delete('/user/:id', commentController.deletecommentbypostuser);
router.delete('/post/:id/user/:id', commentController.deletecommentbypostuser);
router.put('/post/:id/user/:id', commentController.updatecommentsbyUserandPost);
// router.put('/post/:id', commentController.basculeComments)//activer ou desactiver les commentaires


module.exports = router;
