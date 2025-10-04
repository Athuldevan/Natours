const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'sandbox.smtp.mailtrap.io',
  port: 587,
  secure: false,
  auth: {
    user: '0f4e2d0210f967',
    pass: '9da2dbf2552c25',
  },
});

const sendEmail = async (options) => {
  const mailOptions = {
    from: '"Athul" <athuldevan90@gmail.com>', 
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log('✅ Email sent:', info.messageId);
};

module.exports = sendEmail;

