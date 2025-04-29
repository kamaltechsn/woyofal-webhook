const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');  // Pour la gestion des CORS (Cross-Origin Resource Sharing)
const winston = require('winston');  // Pour les logs détaillés
const dotenv = require('dotenv');  // Pour gérer les variables d'environnement

// Charger les variables d'environnement à partir du fichier .env
dotenv.config();

// Créer une instance de l'application Express
const app = express();

// Configurer les middlewares
app.use(bodyParser.json()); // Pour analyser les corps JSON des requêtes
app.use(cors()); // Pour autoriser les requêtes cross-origin

// Configurer Winston pour la gestion des logs
const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  ]
});

// Fonction pour gérer les requêtes Webhook de Dialogflow
app.post('/webhook', (req, res) => {
  logger.info('Requête reçue : ', req.body);

  // Vérifier si la requête contient les données nécessaires
  if (!req.body.queryResult || !req.body.queryResult.queryText) {
    logger.error('Requête invalide, données manquantes.');
    return res.status(400).json({ fulfillmentText: "Désolé, je n'ai pas pu comprendre votre demande." });
  }

  const userQuery = req.body.queryResult.queryText;
  logger.info(`Requête utilisateur: ${userQuery}`);

  // Répondre avec un message adapté à la demande
  return res.json({
    fulfillmentText: `Vous avez demandé : ${userQuery}. Comment puis-je vous aider davantage ?`
  });
});

// Gérer les erreurs pour toutes les routes
app.use((err, req, res, next) => {
  logger.error('Erreur système : ', err.message);
  res.status(500).json({
    fulfillmentText: "Désolé, une erreur s'est produite. Veuillez réessayer plus tard."
  });
});

// Port de l'application, prioriser la variable d'environnement PORT (utile pour les services cloud)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Serveur en écoute sur le port ${PORT}`);
});
