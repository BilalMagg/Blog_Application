// /backend/controllers/postController.js
<<<<<<< HEAD
const { Posts } = require('../models'); // Importe le modèle Posts

const createPost = async (req, res) => {
  try {
    const { title, content, status } = req.body;
    const userId = req.user?.id; // Récupère l'ID de l'utilisateur authentifié via authMiddleware
    if (!userId) return res.status(401).json({ message: 'Utilisateur non authentifié' });

    const newPost = await Posts.create({
      title,
      content,
      user_id: userId,
      status: status || 'draft',
    });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await Posts.findAll();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPostById = async (req, res) => {
  try {
    const post = await Posts.findByPk(req.params.id);
    if (!post) return res.status(404).json({ message: 'Article non trouvé' });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const { title, content, status } = req.body;
    const post = await Posts.findByPk(req.params.id);
    if (!post) return res.status(404).json({ message: 'Article non trouvé' });
    if (post.user_id !== req.user?.id) return res.status(403).json({ message: 'Non autorisé' });

    await post.update({
      title,
      content,
      status,
    });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Posts.findByPk(req.params.id);
    if (!post) return res.status(404).json({ message: 'Article non trouvé' });
    if (post.user_id !== req.user?.id) return res.status(403).json({ message: 'Non autorisé' });

    await post.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//affciher les posts en ordre decroissant
const getAllPostsOrder = async (req, res) => {
  try {
    const posts = await Posts.findAll({
      attributes: {
        include: [
          [Sequelize.fn('COALESCE', Sequelize.fn('SUM', Sequelize.col('Votes.vote')), 0), 'totalVotes']
        ]
      },
      include: [{
        model: require('../models').Vote,
        attributes: [] // Pas besoin d'attributs individuels, juste pour l'agrégation
      }],
      group: ['Posts.id', 'User.id'], // Groupement requis pour l'agrégation
      order: [[Sequelize.literal('totalVotes'), 'DESC']], // Tri décroissant par totalVotes
      include: [{ model: require('../models').User, attributes: ['id', 'username'] }] // Inclut l'utilisateur
    });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur : impossible de récupérer les posts par votes', details: error.message });
  }
};

module.exports = { createPost, getAllPosts, getPostById, updatePost, deletePost ,getAllPostsOrder };
=======
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
>>>>>>> 373e5be6551d3fa48dfd1bdfd3541e20b404a51b
