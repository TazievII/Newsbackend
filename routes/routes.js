const router = require('express').Router();
const usersRouter = require('./users');
const articlesRouter = require('./articles');
const NotFound = require('../errors/notfound');

router.use('/users', usersRouter);
router.use('/articles', articlesRouter);
router.all('*', () => {
  throw new NotFound('Некорректный адрес');
});

module.exports = router;
