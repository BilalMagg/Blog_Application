const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
//const authMiddleware = require('../middleware/auth'); // Middleware d’authentification (à supposer qu’il existe)

<<<<<<< HEAD
// Définition des routes CRUD pour les posts
router.post('/', authMiddleware, postController.createPost);
router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);
router.put('/:id', authMiddleware, postController.updatePost);
router.delete('/:id', authMiddleware, postController.deletePost);
router.get('/order', postController.getAllPostsOrder);
=======
// Définition des routes CRUD pour les posts:
// router.post('/', authMiddleware, postController.createPost);
router.post('/', postController.createPost);
router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);
// router.put('/:id', authMiddleware, postController.updatePost);
router.delete('/:id', postController.deletePost);
>>>>>>> 373e5be6551d3fa48dfd1bdfd3541e20b404a51b

module.exports = router;