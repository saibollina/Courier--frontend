import db from '../models/index.js';
import Sequelize from 'sequelize';
const location = db.location;

export const findAll = (req, res) => {
  location
    .findAll({
      attributes: [Sequelize.fn('DISTINCT', Sequelize.col('source')), 'source'],
    })
    .then((data) => {
      res.status(200).send({ locations: data.map((each) => each.source) });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: 'Some error occurred while retrieving orders.',
      });
    });
};
