import db from "../models/index.js";
import { encrypt, getSalt, hashPassword } from "../authentication/crypto.js";
const Order = db.order;
const Session = db.session;
const Op = db.Sequelize.Op;

// Create and Save a new Order
export const create = async (req, res) => {
  // Validate request
  if (req.body.coustomerID === undefined) {
    const error = new Error("coustomerID cannot be empty for order!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.orderedBy === undefined) {
    const error = new Error("orderedBy cannot be empty for order!");
    error.statusCode = 400;
    throw error;
  }
  const order = {
    coustomerID:req.body.coustomerID,
    orderedBy :req.body.orderedBy,
    orderPlacedTime: new Date(),
  }
  // find by email
  Order.create(order).then((data)=>{
    res.send(data)
  }).catch((error)=> {
    console.log({error});
    res.status(500).send({
        message: "Cannot place order now",
      });
  })
};

// Retrieve all Users from the database.
export const findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

  Order.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    });
};