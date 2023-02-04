var User = require('../models').User;
var Company = require('../models').Company;


exports.checkPasswordCompany = (req, res) => {
    Company.findOne({
        where: { id: req.query.id, password: req.query.password },
    }).then((data) => {
        res.json({ data: data == null ? "wrong" : "correct" });
    }).catch((er) => {
        throw er;
    });
};

exports.checkPasswordUser = (req, res) => {
    User.findOne({
        where: { id: req.query.id, password: req.query.password },
    }).then((data) => {
        res.json({ data: data == null ? "wrong" : "correct" });
    }).catch((er) => {
        throw er;
    });
};
