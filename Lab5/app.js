const express = require('express');
const app = express();
const configRoutes = require('./routes');

configRoutes(app);

app.listen(3000, () => {
  console.log('Server has been started and is now running on http://localhost:3000');
});