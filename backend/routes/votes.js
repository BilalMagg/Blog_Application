const express = require('express');
const router = express.Router();
const voteController = require('../controllers/voteController');
// const authMiddleware = require("../middleware/authMiddleware");

router.post("/", voteController.votePost);
// Ajouter un vote
// router.post('/votes', voteController.addVote);

// Récupérer tous les votes d'un post spécifique
router.get('/posts/:post_id', voteController.getVotesByPost);

// Récupérer tous les votes d'un utilisateur spécifique
router.get("/users/:user_id", voteController.getVotesByUser);

// Mettre à jour un vote existant
router.put("/:vote_id",  voteController.updateVote);

// Supprimer un vote
router.delete("/:vote_id",  voteController.deleteVote);


module.exports = router;