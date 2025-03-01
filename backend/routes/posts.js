const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const authMiddleware = require('../middleware/auth'); // Middleware d’authentification (à supposer qu’il existe)

// Définition des routes CRUD pour les posts:
router.post('/', authMiddleware, postController.createPost);
router.get('/posts/:id', postController.getAllComments);
router.get('/posts/:id/', postController.getPostById);
router.put('/:id', authMiddleware, postController.updatePost);
router.delete('/:id', authMiddleware, postController.deletePost);
module.exports = router;