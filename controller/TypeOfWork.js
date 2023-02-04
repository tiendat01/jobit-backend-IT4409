var TypeOfWork = require('../models').TypeOfWork;
var Work = require('../models').Work;
require('dotenv').config();
let PAGE_SIZE = parseInt(process.env.PAGE_SIZE);
exports.create = (req, res) => {
  TypeOfWork.create(req.body)
    .then((data) => {
      res.json({ data: data });
    })
    .catch((er) => {
      throw er;
    });
};
exports.findall = (req, res) => {
  var page = req.query.page;
  var status = req.query.status;
  var pageSize = req.query.pageSize;
  page = parseInt(page);
  let PA_SI = pageSize || PAGE_SIZE;
  let soLuongBoQua = (page - 1) * PA_SI;
  if (page || status) {
    if (page && !status) {
      TypeOfWork.findAndCountAll({
        order: [['id', 'DESC']],
        offset: soLuongBoQua,
        limit: PA_SI,
      })
        .then((data) => {
          res.json({ data: data });
        })
        .catch((er) => {
          throw er;
        });
    } else if (status && !page) {
      TypeOfWork.findAndCountAll({
        where: { status: status },
        order: [['id', 'DESC']],
        include: [{ model: Work, attributes: ['id'] }],
      })
        .then((data) => {
          res.json({ data: data });
        })
        .catch((er) => {
          throw er;
        });
    } else {
      TypeOfWork.findAndCountAll({
        where: { status: status },
        order: [['id', 'DESC']],
        offset: soLuongBoQua,
        limit: PA_SI,
      })
        .then((data) => {
          res.json({ data: data });
        })
        .catch((er) => {
          throw er;
        });
    }
  } else {
    TypeOfWork.findAndCountAll({
      order: [['id', 'DESC']],
      include: [{ model: Work, attributes: ['id'] }],
    })
      .then((data) => {
        res.json({ data: data });
      })
      .catch((er) => {
        throw er;
      });
  }
};
exports.findCategori = (req, res) => {
  TypeOfWork.findAll({
    order: [['id', 'DESC']],
    include: [{ model: Work, attributes: ['id'] }],
  })
    .then((data) => {
      res.json({ data: data });
    })
    .catch((er) => {
      throw er;
    });
};
exports.findone = (req, res) => {
  TypeOfWork.findOne({ where: { id: req.params.id } })
    .then((data) => {
      res.json({ data: data });
    })
    .catch((er) => {
      throw er;
    });
};
exports.delete = (req, res) => {
  TypeOfWork.destroy({ where: { id: req.params.id } })
    .then((data) => {
      res.json({ data: data });
    })
    .catch((er) => {
      throw er;
    });
};
exports.update = (req, res) => {
  TypeOfWork.update(req.body, { where: { id: req.params.id } })
    .then((data) => {
      res.json({ data: data });
    })
    .catch((er) => {
      throw er;
    });
};
exports.getWork = (req, res) => {
  TypeOfWork.findOne({ where: { id: req.params.id }, include: [Work] })
    .then((data) => {
      res.json({ data: data });
    })
    .catch((er) => {
      throw er;
    });
};
