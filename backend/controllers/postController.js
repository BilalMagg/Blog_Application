// /backend/controllers/postController.js
const { Post } = require('../models'); // Import the Sequelize Post model

// Create Post
const createPost = async (req, res) => {
    try {
        const { title, content, status } = req.body;
        // const userId = req.user?.id || 1; // Simulating user ID

        const newPost = await Post.create({
            // user_id: userId,
            title,
            content,
            status: status || 'draft',
        });

        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// Get All Posts
const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.findAll(); // Fetch all posts from the database
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// Get Post by ID
const getPostById = async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id); // Fetch post by primary key (id)
        if (!post) return res.status(404).json({ message: 'Article non trouvé' });
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// Update Post
const updatePost = async (req, res) => {
    try {
        const { title, content, status } = req.body;
        const post = await Post.findByPk(req.params.id);

        if (!post) return res.status(404).json({ message: 'Article non trouvé' });

        // Check if the user owns the post (assuming req.user.id contains the authenticated user's ID)
        if (post.user_id !== req.user?.id) return res.status(403).json({ message: 'Non autorisé' });

        // Update the post
        await post.update({ title, content, status });

        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// Delete Post
const deletePost = async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id);

        if (!post) return res.status(404).json({ message: 'Article non trouvé' });

        // Check if the user owns the post
        // if (post.user_id !== req.user?.id) return res.status(403).json({ message: 'Non autorisé' });

        await post.destroy(); // Delete the post

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

module.exports = { createPost, getAllPosts, getPostById, updatePost, deletePost };
