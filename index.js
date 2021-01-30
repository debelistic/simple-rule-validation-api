require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { log } = require('debug');

const routes = require('./routes');

const app = express();
app.use(express.json());

app.use(morgan('tiny'));
app.use(cors());
app.use(routes);

app.use((_req, _res, next) => {
  const error = new Error('Your request could not be found.');
  error.status = 404;
  next(error);
});

// eslint-disable-next-line no-unused-vars
app.use((error, _req, res, _next) => {
  if (error.type === 'entity.parse.failed') {
    return res.status(400).send({
      message: 'Invalid JSON payload passed.',
      status: 'error',
      data: null,
    });
  }
  const { message } = error;

  return res.status(error.status || 500).send({
    message,
    status: 'error',
    data: null,
  });
});
app.listen(process.env.PORT, () => {
  log('Listening on ', process.env.PORT);
});
