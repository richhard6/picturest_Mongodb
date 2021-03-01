const express = require('express');
const { json, urlencoded } = require('body-parser');
const morgan = require('morgan');
const config = require('./config.js');
const cors = require('cors');
const authRouter = require('./resources/auth/auth.router');
const pinsRouter = require('./resources/pins/pins.router');
const usersRouter = require('./resources/users/users.router');
const boardsRouter = require('./resources/boards/boards.router');
const jwt = require('express-jwt');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan('dev'));
app.disable('x-powered-by');

app.use('/', authRouter);
app.use('/api/pins', pinsRouter);
app.use('/api/users', usersRouter);
app.use('/api/boards', boardsRouter);

app.use('/healthcheck', (req, res) => {
  return res.status(200).json({ message: 'K' });
});

app.get(
  '/protected',
  jwt({ secret: process.env.TOKEN_SECRET, algorithms: ['HS256'] }),
  (req, res) => {
    res.send('protected');
  }
);

const start = async () => {
  try {
    app.listen(config.port, () => {
      console.log(`REST API on http://localhost:${config.port}/api`);
    });
  } catch (e) {
    console.error(e);
  }
};

module.exports = {
  start,
  app,
};
