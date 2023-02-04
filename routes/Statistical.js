module.exports = (app) => {
  var Statistical = require('../controller/Statistical');
  var router = require('express').Router();

  router.get('/', Statistical.quantity);

  app.use('/statisticals', router);
};
