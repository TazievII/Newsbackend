const Article = require('../models/article');
const NotFound = require('../errors/notfound');
const Forbidden = require('../errors/forbidden');

module.exports.getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch(next);
};

module.exports.createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  Article.create({
    keyword, title, text, date, source, link, image, owner: req.user._id,
  })
    .then((article) => {
      res.status(200).send({
        _id: article._id,
        keyword,
        title,
        text,
        date,
        source,
        link,
        image,
      });
    })
    .catch(next);
};

module.exports.deleteArticle = (req, res, next) => {
  Article.findById(req.params.cardId)
    .then((article) => {
      if (!article) {
        throw new NotFound('Статьи нет по указанному id');
      } if (article.owner._id.toString() === req.user._id) {
        return article.remove(req.params.articleId).then(() => res.status(200).send({ message: 'Удалено' }));
      } throw new Forbidden('Недостаточно прав');
    })
    .catch(next);
};
