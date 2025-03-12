const { Vote, Post } = require("../models");

// Ajouter ou modifier un vote (upvote/downvote)
exports.votePost = async (req, res) => {
    const { post_id, vote } = req.body;
    const user_id = req.user.id; // Récupérer l'utilisateur connecté

    if (vote !== 1 && vote !== -1) {
        return res.status(400).json({ message: "Vote invalide. Doit être 1 ou -1." });
    }

    try {
        // Vérifier si l'utilisateur a déjà voté sur ce post
        const existingVote = await Vote.findOne({ where: { user_id, post_id } });

    if (existingVote) {
        if (existingVote.vote === vote) {
            return res.status(400).json({ message: "Vous avez déjà voté de cette manière." });
        }
        existingVote.vote = vote;
        await existingVote.save();
        return res.json({ message: "Vote mis à jour !" });
    }

    // Sinon, créer un nouveau vote
    await Vote.create({ user_id, post_id, vote });
    res.status(201).json({ message: "Vote enregistré !" });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
};

// Récupérer tous les votes d'un post
exports.getVotesByPost = async (req, res) => {
    const { post_id } = req.params;

    try {
        const votes = await Vote.findAll({ where: { post_id } });
        res.json(votes);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
};

// Récupérer tous les votes d'un utilisateur
exports.getVotesByUser = async (req, res) => {
    const { user_id } = req.params;

    try {
        const votes = await Vote.findAll({
            where: { user_id },
            include: [{ model: Post, attributes: ["title"] }],
    });
    res.json(votes);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
};

// Mettre à jour un vote
exports.updateVote = async (req, res) => {
    const { vote_id } = req.params;
    const { vote } = req.body;
    const user_id = req.user.id; 

    if (vote !== 1 && vote !== -1) {
        return res.status(400).json({ message: "Vote invalide." });
    }

    try {
        const existingVote = await Vote.findOne({ where: { id: vote_id, user_id } });

    if (!existingVote) {
        return res.status(404).json({ message: "Vote non trouvé ou non autorisé." });
    }

    existingVote.vote = vote;
    await existingVote.save();

    res.json({ message: "Vote mis à jour !" });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
};

// Supprimer un vote
exports.deleteVote = async (req, res) => {
    const { vote_id } = req.params;
    const user_id = req.user.id;

    try {
        const vote = await Vote.findOne({ where: { id: vote_id, user_id } });

    if (!vote) {
        return res.status(404).json({ message: "Vote non trouvé ou non autorisé." });
    }

    await vote.destroy();
    res.json({ message: "Vote supprimé !" });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
};
