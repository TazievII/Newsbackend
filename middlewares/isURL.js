const isURL = require('validator/lib/isURL');
const BadRequest = require('../errors/badrequest');

module.exports.urlValidate = (v) => {
  const link = isURL(v);
  if (link !== true) {
    throw new BadRequest('Ошибка валидации ссылки');
  } else return v;
};
