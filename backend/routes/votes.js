const express = require('express');
const router = express.Router();
const voteController = require('../controllers/voteController');
const authMiddleware = require("../middleware/authMiddleware");
const sanitizeContent = require('../middleware/sanitation');

router.post("/", authMiddleware,voteController.votePost);
// Ajouter un vote
// router.post('/votes', voteController.addVote);

// Récupérer tous les votes d'un post spécifique
router.get('/posts/:post_id',authMiddleware, voteController.getVotesByPost);

// Récupérer tous les votes d'un utilisateur spécifique
router.get("/users/:user_id",authMiddleware, voteController.getVotesByUser);

// Mettre à jour un vote existant
router.put("/:vote_id", authMiddleware,sanitizeContent ,voteController.updateVote);

// Supprimer un vote
router.delete("/:vote_id", authMiddleware, voteController.deleteVote);


module.exports = router;