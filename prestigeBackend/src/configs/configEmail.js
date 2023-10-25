import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_APPLI,
      pass: process.env.MDP_MAIL_APPLI,
    },
    debug: true, // Affiche les logs de débogage
    logger: true, // Active le journalisation
    tls: {
        rejectUnauthorized: false // Ajoute cette ligne pour ignorer la vérification du certificat
    }
});

transporter.verify((error, success) => {
    if (error) {
      console.log('Erreur de vérification du transporter:', error);
    } else {
      console.log('Le serveur est prêt à accepter les messages:', success);
    }
});

export default transporter;
