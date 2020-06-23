const usersRouter = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const { findUser, updateUser } = require('../controllers/users');

usersRouter.get('/me', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
}), findUser);
usersRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUser);

module.exports = usersRouter;
