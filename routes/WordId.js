module.exports = app => {
    var Work = require('../controller/Work');
    var router = require('express').Router();

    router.get('/', Work.findAllId);
    router.get('/reject', Work.findAllRejectId);

    app.use("/workId", router);
}
// để lấy công việc của một công ty