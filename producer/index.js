const express = require('express');
const app = express();
const emailRoute = require('./routes/email');
const { port } = require('../shared/config');

app.use(express.json());
app.use('/api/email', emailRoute);

app.listen(port, () => {
  console.log(`Producer server running on port ${port}`);
});
