const express = require('express');
const bodyParser = require('body-parser');
const winston = require('winston');
require('dotenv').config();  // Pour charger les variables d'environnement

const app = express();

// Configuration des logs avec Winston
const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console({ format: winston.format.simple() })
  ]
});

// Middleware pour parser le corps des requêtes en JSON
app.use(bodyParser.json());

// Route de base
app.get('/', (req, res) => {
  res.send('Bienvenue sur le serveur Woyofal!');
});

// Route POST
app.post('/message', (req, res) => {
  const { nom, message } = req.body;

  if (!nom || !message) {
    logger.warn('Champs manquants dans la requête');
    return res.status(400).json({ error: 'Champs requis manquants' });
  }

  logger.info(`Message reçu de ${nom}: ${message}`);
  res.status(200).json({ message: 'Reçu avec succès!' });
});

// Démarrer le serveur sur le port 10000 (ou celui que tu souhaites)
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  logger.info(`Serveur en écoute sur le port ${PORT}`);
});
