// Route pour la soumission du mot de passe
FormAuthRoutes.post('/create-password', async (req, res) => {
    const { token, password } = req.body;
  
    try {
      // Recherche de l'utilisateur par le token d'activation
      const client = await Client.findOne({ where: { identifcatetoken: token } });
  
      if (!client) {
        return res.status(400).send('Token d\'activation invalide ou expiré.');
      }
  
      // Met à jour le mot de passe et active le compte
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      console.log('Hashed Password:', hashedPassword);
  
      client.password = hashedPassword;
      client.actif = true;
      await client.save();
  
      res.status(200).send('Mot de passe créé avec succès. Votre compte est activé.');
    } catch (err) {
      console.error(err);
      res.status(500).send('Erreur lors de la création du mot de passe.');
    }
  });
  export default FormAuthRoutes