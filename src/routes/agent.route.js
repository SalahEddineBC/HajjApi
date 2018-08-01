const express = require('express');
const { Agent } = require('../models/');
const restify = require('express-restify-mongoose');
const router = express.Router();
restify.serve(router, Agent);
module.exports = router
