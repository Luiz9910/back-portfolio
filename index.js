require("dotenv").config()
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.post('/send-email', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL, 
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: email,
      to: process.env.EMAIL, 
      subject: message,
      text: `Nome: ${name}\nE-mail: ${email}\nMensagem: ${message}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).send('E-mail enviado com sucesso!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao enviar o e-mail');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
