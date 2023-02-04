module.exports = (app) => {
  const livesearchResult = require('../controller/LivesearchResult');
  var router = require('express').Router();

  router.get('/', livesearchResult.findByKeyword);

  app.use('/livesearch', router);
};
