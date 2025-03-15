const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentControllers');

const authenticateJWT=require('../middleware/authentification')

router.post('/post/:id/user/:id',authenticateUser,commentController.createComment);
router.get('/', authenticateUser, commentController.getAllcomments);
router.get('/post/:id', authenticateUser, commentController.getAllcommentsbypost);
router.get('/user/:id', authenticateUser, commentController.getAllcommentsbyuser);
router.get('/post/:id/user/:id',authenticateUser, commentController.getcommentbyPostandUser);
router.get('/post/:id',authenticateUser, commentController.sortCommentbyTime);
router.delete('/',authenticateUser, commentController.deleteAllcomment);
router.delete('/post/:id',authenticateUser, commentController.deletecommentbypostuser);
router.delete('/user/:id',authenticateUser, commentController.deletecommentbypostuser);
router.delete('/post/:id/user/:id',authenticateUser, commentController.deletecommentbypostuser);
router.put('/post/:id/user/:id',authenticateUser, commentController.updatecommentsbyUserandPost);
// router.put('/post/:id', commentController.basculeComments)//activer ou desactiver les commentaires


module.exports = router;
