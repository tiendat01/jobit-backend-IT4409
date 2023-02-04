module.exports = app => {
    var ChangePassword = require('../controller/changePassword');
    var router = require('express').Router();

    router.get('/company', ChangePassword.checkPasswordCompany);
    router.get('/user', ChangePassword.checkPasswordUser);

    app.use("/changePassword", router);
}
// để lấy công việc của một công ty