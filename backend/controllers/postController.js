// /backend/controllers/postController.js
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
