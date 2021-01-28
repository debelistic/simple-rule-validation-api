const express = require('express');

const Router = express.Router();

Router.get('/', (req, res) => {
  res.send({
    message: 'Welcome to Simple API validation',
    status: 'success',
    data: {
      name: 'Victor Awotidebe',
      github: '@debelistic',
      email: 'victorawotidebe@gmail.com',
      mobile: '09068577929',
      twitter: '@debelistic',
    },
  });
});

module.exports = Router;
