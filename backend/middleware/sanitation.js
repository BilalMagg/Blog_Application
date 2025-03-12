module.exports = (req, res, next) => {
    const { title, content, username, password, email, comments } = req.body;

    if (!title || !content || !username || !password || !email || !comments) {
        return res.status(400).json({ message: "Tous les champs sont obligatoires !" });
    }

    next(); 
};