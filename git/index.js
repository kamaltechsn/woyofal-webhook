const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/', (req, res) => {
    const intent = req.body.queryResult.intent.displayName;

    let responseText = "Désolé, je n'ai pas compris votre demande.";

    switch (intent) {
        case 'Default Welcome Intent':
            responseText = "Bonjour et bienvenue sur le support Woyofal ! Comment puis-je vous aider ?";
            break;
        case 'Demande_Rechargement':
            responseText = "Pour recharger votre compteur, achetez un crédit chez un revendeur et entrez le code reçu sur votre compteur Woyofal.";
            break;
        case 'Panne_Compteur':
            responseText = "En cas de panne, vérifiez d'abord si l'écran de votre compteur est allumé. Sinon, contactez notre assistance technique.";
            break;
        case 'Parler_Agent':
            responseText = "Je vous mets en relation avec un agent humain. Merci de patienter.";
            break;
    }

    return res.json({
        fulfillmentText: responseText
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});