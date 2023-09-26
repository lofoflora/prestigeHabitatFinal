import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: (process.env.MAIL_APPLI),
      pass: (process.env.MDP_MAIL_APPLI),
    },
  });
  export default transporter
