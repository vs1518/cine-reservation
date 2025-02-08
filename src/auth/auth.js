const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Middleware pour vérifier le token
function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(403).json({ message: "Accès refusé : aucun token fourni." });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(403).json({ message: "Accès refusé : format du token incorrect." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Accès refusé : token invalide." });
    }
    req.user = decoded;
    next();
  });
}

// Route protégée pour récupérer le profil
router.get('/profile', verifyToken, (req, res) => {
  res.json({
    message: "Profil de l'utilisateur récupéré avec succès.",
    data: req.user
  });
});

// Route de test (sans middleware)
router.get('/test', (req, res) => {
  res.send("La route test fonctionne !");
});

module.exports = router;