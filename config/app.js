const express = require('express');
const app = express();
const db =require('./db');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const { User } = require('../src/routes');

app.use(bodyParser.json());
app.use(methodOverride());
const router = express.Router();
app.get('/', (req, res, next) => {
  res.send(JSON.stringify({ message: 'hello world' }));
});

module.exports = app;
