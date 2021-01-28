require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { log } = require('debug');

const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));
app.use(cors());
app.use(routes);

app.listen(process.env.PORT, () => {
  log('Listening on ', process.env.PORT);
});
