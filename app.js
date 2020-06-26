const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const express = require('express');
require('dotenv').config();
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const auth = require('./middlewares/auth');
const routes = require('./routes/routes');
const { signInRouter, signUpRouter } = require('./routes/auth');
const { ErrorMiddleware } = require('./middlewares/error');
// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/newsanalyzerdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(limiter);
app.use(helmet());
app.use(requestLogger);
app.use('/', signUpRouter);
app.use('/', signInRouter);
app.use(auth);
app.use('/', routes);
app.use(errorLogger);
app.use(errors());
app.use(ErrorMiddleware);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
