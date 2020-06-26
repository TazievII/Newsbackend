const signInRouter = require('express').Router();
const signUpRouter = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const { login, createUser } = require('../controllers/users');

signUpRouter.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), createUser);
signInRouter.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

module.exports = { signInRouter, signUpRouter };
