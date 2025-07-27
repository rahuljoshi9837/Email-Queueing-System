const express = require('express');
const router = express.Router();
const { queueEmail } = require('../utils/rabbitmq');

router.post('/', async (req, res) => {
  const { to, subject, body } = req.body;
  if (!to || !subject || !body) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  await queueEmail({ to, subject, body });
  res.status(200).json({ message: 'Email queued successfully' });
});

module.exports = router;
