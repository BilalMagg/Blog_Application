const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // 1. Récupérer le token depuis l'en-tête Authorization
  const token = req.header('Authorization')?.replace('Bearer ', '');

  // 2. Si aucun token n'est fourni, renvoyer une erreur 401
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // 3. Vérifier et décoder le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Ajouter les informations de l'utilisateur à req.user
    req.user = decoded;

    // 5. Passer au prochain middleware ou à la route
    next();
  } catch (err) {
    // 6. Si le token est invalide ou expiré, renvoyer une erreur 400
    res.status(400).json({ message: 'Invalid token.' });
  }
};

module.exports = authMiddleware;