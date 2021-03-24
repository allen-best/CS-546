const books = require("./data/books");
const reviews = require("./data/reviews");
const connection = require('./config/mongoConnection');
const ObjectId = require('mongodb').ObjectID;

const express = require('express');
const app = express();
const configRoutes = require('./routes');

configRoutes(app);

app.listen(3000, () => {
  console.log('Server has been started and is now running on http://localhost:3000');
});