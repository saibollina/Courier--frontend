import db from "../models/index.js";

const Plan = db.plan;
const Op = db.Sequelize.Op;
const sequelize = db.sequelize;
const Day = db.day;

export const createPlan = (req, res) =>{

  // Validate request
  if (req.body.name === undefined) {
    const error = new Error("name cannot be empty for itenarary!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.description === undefined) {
    const error = new Error("description cannot be empty for itenarary!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.starts_on === undefined) {
    const error = new Error("starts_on cannot be empty for itenarary!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.ends_on === undefined) {
    const error = new Error("ends_on cannot be empty for itenarary!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.image === undefined) {
    const error = new Error("image cannot be empty for itenarary!");
    error.statusCode = 400;
    throw error;
  }

  const plan = {
    name: req.body.name,
    description: req.body.description,
    image: req.body.image,
    starts_on: req.body.starts_on,
    ends_on: req.body.ends_on,
    rating: req.body.rating,
  };

  Plan.create(plan)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the plan.",
      });
    });

}

export const getAllplans = (req, res) => {
  const { from, to, startDate, endDate, search } = req.query;

  const whereCondition = {
    [Op.and]: [],
  };

  if (from) {
    whereCondition[Op.and].push({ from_place: { [Op.like]: `%${from}%` } });
  }

  if (to) {
    whereCondition[Op.and].push({ to_place: { [Op.like]: `%${to}%` } });
  }

  if (startDate) {
    whereCondition[Op.and].push({ starts_on: sequelize.where(sequelize.fn('DATE', sequelize.col('starts_on')), startDate) });
  }

  if (endDate) {
    whereCondition[Op.and].push({ ends_on: sequelize.where(sequelize.fn('DATE', sequelize.col('ends_on')), endDate) });
  }

  if (search) {
    const searchCondition = {
      [Op.or]: [
        { name: { [Op.like]: `%${search}%` } },
        { from_place: { [Op.like]: `%${search}%` } },
        { to_place: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` }}
      ],
    };
    whereCondition[Op.and].push(searchCondition);
  }
  Plan.findAll({
    where: whereCondition,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving plans",
      });
    });
};


export const getplan = (req, res) =>{
    const id = req.params.planId;
    Plan.findByPk(id,{ include: [Day] }).then((data) => {
          res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Error retrieving plan with id=" + id
        });
      });
}

// Update a plan by the id in the request
export const updatePlan = (req, res) => {
    const id = req.params.id;
  
    Plan.update(req.body, {
      where: { id: id },
    })
      .then((data) => {
        if (data == 1) {
          res.send({
            message: "plan was updated successfully.",
          });
        } else {
          res.send({
            message: `Cannot update plan with id=${id}. Maybe plan was not found or req.body is empty!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Error updating plan with id=" + id,
        });
      });
  };
  
  // Delete a plan with the specified id in the request
export const deletePlan = (req, res) => {
    const id = req.params.id;
  
    Plan.destroy({
      where: { id: id },
    })
      .then((data) => {
        if (data == 1) {
          res.send({
            message: "plan was deleted successfully!",
          });
        } else {
          res.send({
            message: `Cannot delete plan with id=${id}. Maybe plan was not found!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Could not delete plan with id=" + id,
        });
      });
  };
  
  // Delete all plans from the database.
  export const deleteAllPlans = (req, res) => {
    Plan.destroy({
      where: {},
      truncate: false,
    })
      .then((data) => {
        res.send({ message: `${data} plans were deleted successfully!` });
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all plans.",
        });
      });
  };

  export const searchPlan = (req, res) => {
    const search = req.query.search;
    var condition = search
    ? {
        [Op.or]: [
          { name: { [Op.like]: `%${search}%` } },
          { description: { [Op.like]: `%${search}%` } },
          { id: { [Op.like]: `%${search}%` } },
        ],
      }
    : null;
  
    Plan.findAll({ where: condition })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving plans.",
        });
      });
  };
