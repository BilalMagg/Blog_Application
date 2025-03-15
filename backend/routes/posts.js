const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
//const authMiddleware = require('../middleware/auth'); // Middleware d’authentification (à supposer qu’il existe)
const sanitizeContent = require('../middleware/sanitation');


router.post('/', authenticateUser , postController.createPost);
router.get('/', authenticateUser,  postController.getAllPosts);
router.get('/:id', authenticateUser, postController.getPostById);
router.delete('/:id', authenticateUser, postController.deletePost);

module.exports = router;