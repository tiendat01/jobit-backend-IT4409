module.exports = (app) => {
  var SendMail = require('../controller/SendMail');
  var router = require('express').Router();

  router.post('/', SendMail.send);

  app.use('/sendMail', router);
};
