import db from "../models/index.js";

const Order = db.order;
const Op = db.Sequelize.Op;

export const createOrder = (req, res) =>{
    // Validate request
    if (req.body.user_id === undefined) {
      const error = new Error("user_id cannot be empty for booking!");
      error.statusCode = 400;
      throw error;
    } else if (req.body.plan_id === undefined) {
      const error = new Error("plan_id per unit cannot be empty for booking!");
      error.statusCode = 400;
      throw error;
    }

  const order = {
    userId: req.body.user_id,
    planId: req.body.plan_id,
  };

  Order.create(order)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the order.",
      });
    });

}

export const getAllOrders = (req, res) =>{
    Order.findAll().then((data) => {
          res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Error retrieving orders"
        });
      });
}

export const getOrder = (req, res) =>{
    const id = req.params.orderId;
    console.log('id', id)
    Order.findByPk(id).then((data) => {
          res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Error retrieving order with id=" + id
        });
      });
}

// Update a order by the id in the request
export const updateOrder = (req, res) => {
  const id = req.params.id;

  Order.update(req.body, {
    where: { id: id },
  })
    .then((data) => {
      if (data == 1) {
        res.send({
          message: "order was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update order with id=${id}. Maybe order was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating order with id=" + id,
      });
    });
};

// Delete a order with the specified id in the request
export const deleteOrder = (req, res) => {
  const id = req.params.id;

  Order.destroy({
    where: { id: id },
  })
    .then((data) => {
      if (data == 1) {
        res.send({
          message: "order was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete order with id=${id}. Maybe order was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete order with id=" + id,
      });
    });
};

// Delete all orders from the database.
export const deleteAllOrders = (req, res) => {
  Order.destroy({
    where: {},
    truncate: false,
  })
    .then((data) => {
      res.send({ message: `${data} orders were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all orders.",
      });
    });
};

export const searchOrder = (req, res) => {
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
  
    Order.findAll({ where: condition })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving orders.",
        });
      });
  };