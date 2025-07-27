const amqp = require('amqplib');
const { rabbitUrl, queueName } = require('../../shared/config');

async function queueEmail(emailData) {
  const conn = await amqp.connect(rabbitUrl);
  const channel = await conn.createChannel();
  await channel.assertQueue(queueName, { durable: true });
  channel.sendToQueue(queueName, Buffer.from(JSON.stringify(emailData)), {
    persistent: true,
  });
  console.log('Queued email:', emailData.to);
  setTimeout(() => {
    conn.close();
  }, 500);
}

module.exports = { queueEmail };

