const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.post('/webhook', (req, res) => {
  const intentName = req.body.queryResult?.intent?.displayName;

  let responseText = "Je n'ai pas bien compris. Pouvez-vous reformuler ?";
  if (intentName === 'compteur_info') {
    responseText = "Le compteur Woyofal fonctionne avec des tickets de recharge.";
  } else if (intentName === 'recharge') {
    responseText = "Pour recharger votre compteur, entrez le code sur votre boîtier.";
  } else if (intentName === 'panne_signalement') {
    responseText = "Veuillez contacter le service client ou un agent pour signaler une panne.";
  } else if (intentName === 'parler_agent') {
    responseText = "Un agent humain va vous contacter sous peu.";
  }

  res.json({
    fulfillmentText: responseText
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Woyofal webhook is running on port ${PORT}`);
});
