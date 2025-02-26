// /backend/controllers/postController.js
let mockPosts = [
    { id: 1, user_id: 1, title: 'Premier Article', content: 'Contenu du premier article', status: 'published', created_at: new Date(), updated_at: new Date() },
    { id: 2, user_id: 1, title: 'Deuxième Article', content: 'Contenu du deuxième article', status: 'draft', created_at: new Date(), updated_at: new Date() },
  ];
  let nextId = 3;
  
  const createPost = (req, res) => {
    const { title, content, status } = req.body;
    const userId = req.user?.id || 1; // Simule un user_id (par exemple, 1 pour un utilisateur fictif)
    const newPost = {
      id: nextId++,
      user_id: userId,
      title,
      content,
      status: status || 'draft',
      created_at: new Date(),
      updated_at: new Date(),
    };
    mockPosts.push(newPost);
    res.status(201).json(newPost);
  };
  
  const getAllPosts = (req, res) => {
    res.status(200).json(mockPosts);
  };
  
  const getPostById = (req, res) => {
    const post = mockPosts.find(p => p.id === parseInt(req.params.id));
    if (!post) return res.status(404).json({ message: 'Article non trouvé' });
    res.status(200).json(post);
  };
  
  const updatePost = (req, res) => {
    const { title, content, status } = req.body;
    const postIndex = mockPosts.findIndex(p => p.id === parseInt(req.params.id));
    if (postIndex === -1) return res.status(404).json({ message: 'Article non trouvé' });
    // Simule une vérification d’autorisation (par exemple, user_id doit correspondre)
    if (mockPosts[postIndex].user_id !== req.user?.id) return res.status(403).json({ message: 'Non autorisé' });
    mockPosts[postIndex] = { ...mockPosts[postIndex], title, content, status, updated_at: new Date() };
    res.status(200).json(mockPosts[postIndex]);
  };
  
  const deletePost = (req, res) => {
    const postIndex = mockPosts.findIndex(p => p.id === parseInt(req.params.id));
    if (postIndex === -1) return res.status(404).json({ message: 'Article non trouvé' });
    // Simule une vérification d’autorisation
    if (mockPosts[postIndex].user_id !== req.user?.id) return res.status(403).json({ message: 'Non autorisé' });
    mockPosts.splice(postIndex, 1);
    res.status(204).send();
  };
  
  module.exports = { createPost, getAllPosts, getPostById, updatePost, deletePost };