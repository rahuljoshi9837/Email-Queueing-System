const amqp = require('amqplib');
const nodemailer = require('nodemailer');
const { rabbitUrl, queueName, smtpUser, smtpPass } = require('../shared/config');

async function connectToRabbitMQ(retries = 10, delay = 3000) {
  while (retries > 0) {
    try {
      const conn = await amqp.connect(rabbitUrl);
      const channel = await conn.createChannel();
      await channel.assertQueue(queueName, { durable: true });

      console.log(`✅ Connected to RabbitMQ. Worker is waiting for messages in queue: ${queueName}`);

      channel.consume(queueName, async (msg) => {
        if (msg !== null) {
          const { to, subject, body } = JSON.parse(msg.content.toString());
          console.log(`📨 Sending email to: ${to}`);

          try {
            await sendEmail(to, subject, body);
            channel.ack(msg);
          } catch (error) {
            console.error('❌ Email failed:', error.message);
            channel.nack(msg, false, false);
          }
        }
      });

      break; // exit retry loop on success
    } catch (err) {
      console.error(`❌ Could not connect to RabbitMQ (${retries} retries left). Retrying in ${delay / 1000}s...`);
      retries--;
      if (retries === 0) {
        console.error("💥 Failed to connect to RabbitMQ. Exiting...");
        process.exit(1);
      }
      await new Promise((res) => setTimeout(res, delay));
    }
  }
}

async function sendEmail(to, subject, body) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  await transporter.sendMail({
    from: smtpUser,
    to,
    subject,
    text: body,
  });

  console.log(`✅ Email sent to ${to}`);
}

connectToRabbitMQ();