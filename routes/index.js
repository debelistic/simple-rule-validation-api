const express = require('express');

const Router = express.Router();
const { Validate } = require('../controller');

Router.get('/', (req, res) => {
  res.status(200).send({
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

Router.post('/validate-rule', Validate);
module.exports = Router;
