const db = require('../models');
const Op = db.Sequelize.Op;
const LivesearchResult = db.LivesearchResult;
const Company = db.Company;

exports.findByKeyword = (req, res) => {
  let keyword = req.query.keyword;
  LivesearchResult.findAll({
    where: {
      keyword: {
        [Op.substring]: `${keyword}`,
      },
    },
    attributes: ['keyword'],
  })
    .then(async (data) => {
      let response = {
        keywords: data.map((item) => item.keyword),
        companies: [],
      };
      try {
        response.companies = await Company.findAll({
          where: {
            name: {
              [Op.like]: `%${keyword}%`,
            },
          },
          attributes: ['name', 'id'],
        })

      } catch (error) {
        console.error(error);
      }
      
      res.send(response);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving tutorials.',
      });
    });
};
