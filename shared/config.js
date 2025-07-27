require('dotenv').config();

module.exports = {
  port: process.env.PORT,
  rabbitUrl: process.env.RABBITMQ_URL,
  queueName: process.env.EMAIL_QUEUE,
  smtpUser: process.env.SMTP_USER,
  smtpPass: process.env.SMTP_PASS,
};