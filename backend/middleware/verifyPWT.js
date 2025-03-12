module.exports = (req, res, next) => {
    const { password } = req.body;

    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(password)) {
        return res.status(400).json({
            message: "Le mot de passe doit contenir au moins 8 caractères, dont des lettres, des chiffres et un caractère spécial."
        });
    }

    next();
};
