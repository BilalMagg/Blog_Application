const jwt = require('jsonwebtoken');
const secretKey = 'secret'; 
const authenticateJWT = (req, res, next) => {
  
  const token = req.headers['authorization']?.split(' ')[1]; 

  if (!token) {
    return res.status(403).json({ message: 'Accès interdit : jeton manquant' });
  }

  
  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Accès interdit : jeton invalide' });
    }

    
    req.user = user;
    next(); 
  });
};

module.exports = authenticateJWT;
