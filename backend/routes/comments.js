const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

router.get('/posts/:id', postController.getAllComments);
router.get('/posts/:id/users/:id', postController.getPostById);
router.put('/:id', authMiddleware, postController.updatePost);
router.delete('/:id', authMiddleware, postController.deletePost);
