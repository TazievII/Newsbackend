const articlesRouter = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const { urlValidate } = require('../middlewares/isURL');

const {
  getArticles, createArticle, deleteArticle,
} = require('../controllers/articles.js');

articlesRouter.get('/', getArticles);
articlesRouter.post('/', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required().min(2),
    title: Joi.string().required().min(2),
    text: Joi.string().required().min(2),
    date: Joi.string().required().min(9),
    source: Joi.string().required().min(2),
    link: Joi.string().custom(urlValidate, 'urlValidator').required(),
    image: Joi.string().custom(urlValidate, 'urlValidator').required(),
  }),
}), createArticle);
articlesRouter.delete('/:articleId', celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().alphanum().length(24),
  }),
}), deleteArticle);
