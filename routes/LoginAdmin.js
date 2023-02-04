module.exports = (app) => {
  var Login = require('../controller/Login');
  var router = require('express').Router();

  router.post('/', Login.loginAdmin);

  app.use('/loginAdmin', router);
};
