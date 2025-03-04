app.use(express.json());
const Comment = require('./models/comment.js')

exports.createComment = async (req, res) => {
    try {
        const { user_id, post_id, content } = req.body;
        const newComment = await Comment.Create({ user_id, post_id, content })

        await newComment.save();
        res.status(201).json({ message: "Commentaire est ajouté ", comment: newComment })
    }
    catch (error) {
        res.status(500).json({ error: "erreur" });
    }
};

exports.getAllcomments = async (req, res) => {
    try {
        const comments = await Comment.findAll();
        if (comments.length === 0) {
          return   res.status(400).json({ message: "aucun comment trouvé" })
        }
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: "erreur" });
    }
};


exports.getAllcommentsbypost = async (req, res) => {
    try {
        const { post_id } = req.params;
        const comments = await Comment.findAll({ where: { post_id } });
        if (comments.length === 0) {
           return   res.status(404).json({ message: "le poste ne contient aucun commentaire " });
        }
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: " erreur" });
    }
};

exports.getAllcommentsbyuser = async (req, res) => {
    try {
        const { user_id } = req.params;
        const comments = await Comment.findAll({ where: { user_id } });
        if (comments.length === 0) {
           return  res.status(404).json({ message: " l'utilisateur n'a aucun commentaires  " });
        }
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: " erreur" });
    }
};

exports.getcommentbyPostandUser = async (req, res) => {
    try {
        const { user_id, post_id } = req.params;
        const comments = await Comment.findAll({ where: { user_id, post_id } });
        if (comments.length === 0) {
            res.status(404).json({ message: " l'utilisateur n'a aucun commentaires  " });
        }
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: " erreur" });

    }
};

exports.sortCommentbyTime = async (req, res) => {
    try {
        const comments = await Comment.findAll({
            order: [['createdAt', 'DES']]
        });
        res.json(comments);
    } catch (error) {
        res.status(500).json({ error: "erreur " });
    }

};

exports.deleteAllcomment = async (req, res) => {
    try {
        await Comment.destroy({});
        res.status(200).json({ message: "tous les commentaires sont suprimés" });
    } catch (error) {
        res.status(500).json({ error: "erreur" });
    }

};

exports.deleteAllcommentsbypost = async (req, res) => {
    try {
        const { post_id } = req.params;
        await Comment.destroy({ post_id });
        res.status(200).json({ message: "les commentaires de ce poste sont supprimés " });
    } catch (error) {
        res.status(500).json({ error: "erreur" });

    }
};

exports.deletecommentbyuser = async (req, res) => {
    try {
        const { user_id } = req.params;
        await Comment.delete({ user_id });
        res.status(200).json({ message: "les commentaires de ce utilisateur sont supprimés " });
    } catch (error) {
        res.status(500).json({ error: "erreur" });

    }

};

exports.deletecommentbypostuser = async (req, res) => {
    try {
        const { user_id, post_id } = req.params;
        await Comment.delete({ user_id, post_id });
        res.status(200).json({ message: "les commentaires de ce post et de ce utilisateur sont supprimés " });
    } catch (error) {
        res.status(500).json({ error: "erreur" });

    }
};

exports.updatecommentsbyUserandPost = async (req, res) => {
    try {
        const { user_id, post_id , comment_id} = req.params;
        const  { content } = req.body;

        const comment = await Comment.findOne({
            where: {
                id: comment_id,
                userId: user_id,
                postId: post_id,
            }
        });
       if(!comment){
           return res.status(404).json({message :"le commentaire est non trouvé"});
       }
         await comment.update({content});
         res.status(200).json({message : "le message est modifié"});
    }catch(error){
        res.status(500).json({error : "erreur "});

    }
}


