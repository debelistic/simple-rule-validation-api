const express = require('express');

const Router = express.Router();

Router.get('/', (req, res) => {
  res.send({
    message: 'Welcome to Simple API validation',
    status: 'success',
    data: {},
  });
});

module.exports = Router;
