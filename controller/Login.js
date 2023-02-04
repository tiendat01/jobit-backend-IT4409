require('dotenv').config();
const Company = require('../models').Company;
const User = require('../models').User;
const Admin = require('../models').Admin;
const jwt = require('jsonwebtoken');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.loginCompany = (req, res) => {
    const email = req.body.email;
    const status = req.body.status;
    const password = req.body.password;
    Company.findAll({
        where: { email: email, password: password, status: status },
    })
        .then((data) => {
            if (data[0] !== undefined) {
                var company = {
                    id: data[0].id,
                    name: data[0].name,
                    avatar: data[0].avatar,
                    banner: data[0].banner,
                    role: '',
                    type: 'company',
                };
                var token = jwt.sign(
                    { user: company },
                    process.env.ACCESS_TOKEN_SECRET,
                    { algorithm: 'HS256', expiresIn: '3h' },
                );
                res.json(token);
            } else {
                res.json('err');
            }
        })
        .catch((err) => {
            res.json({ err: err.message });
        });
};

exports.checkLogin = (req, res) => {
    if (
        req.headers &&
        req.headers.authorization &&
        String(req.headers.authorization.split(' ')[0]).toLowerCase() === 'bearer'
    ) {
        var token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, company) => {
            if (err) {
                return res.status(403).send({
                    message: 'token loi roi',
                });
            } else {
                res.json({ data: company });
            }
        });
    } else {
        return res.status(403).send({
            message: 'UN',
        });
    }
};

exports.loginUser = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const status = req.body.status;
    User.findAll({
        where: { email: email, password: password, status: status },
    })
        .then((data) => {
            if (data[0] !== undefined) {
                var user = {
                    id: data[0].id,
                    avatar: data[0].avatar,
                    name: data[0].name,
                    banner: data[0].banner,
                    role: "user",
                    type: 'user',
                };
                var token = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
                    algorithm: 'HS256',
                    expiresIn: '3h',
                });
                res.json(token);
            } else {
                res.json('err');
            }
        })
        .catch((err) => {
            res.json({ err: err.message });
        });
};

exports.loginAdmin = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    Admin.findAll({
        where: { email: email, password: password },
    })
        .then((data) => {
            if (data[0] !== undefined) {
                var user = {
                    id: data[0].id,
                    name: data[0].name,
                    role: "admin",
                };
                var token = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
                    algorithm: 'HS256',
                    expiresIn: '3h',
                });
                res.json(token);
            } else {
                res.json('err');
            }
        })
        .catch((err) => {
            res.json({ err: err.message });
        });
};
