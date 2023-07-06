import db from "../models/index.js";
import {getEstimatedCost} from "../utils/deliveryCostEstimater.js"
const Order = db.order;
const Op = db.Sequelize.Op;

export const create = async (req, res) => {
  if (req.body.coustomerID === undefined) {
    return res.status(400).send({
      message: "coustomerID cannot be empty for order!",
    });
    
  }
  if (req.body.orderedBy === undefined) {
    return res.status(400).send({
      message: "orderedBy cannot be empty for order!",
    });
  }
  if (req.body.dropLocation === undefined) {
    return res.status(400).send({
        message: "droplocation cannot be empty for order!",
      });
  }
  if (req.body.pickupLocation === undefined) {
    return res.status(400).send({
      message: "pickup location cannot be empty for order!",
    });
  }
  if (req.body.cost === undefined) {
    return res.status(400).send({
      message: "cost cannot be empty for order!",
    });
  }
  const order = {
    coustomerID:req.body.coustomerID,
    orderedBy :req.body.orderedBy,
    orderPlacedTime: new Date(),
    cost: req.body.cost,
    pickupLocation:req.body.pickupLocation,
    dropLocation:req.body.dropLocation,
    status:'Order-placed'
  }

  await Order.create(order).then((data)=>{
    console.log('orderPlaced', data)
    res.send(data)
  }).catch((error)=> {
    console.log({error});
    res.status(500).send({
        message: "Cannot place order now",
      });
  });
};

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

export const estimateDeliveryCost = (req, res) => {
  const dropLocation = req.query.dropLocation;
  const pickupLocation = req.query.pickupLocation;
  if (dropLocation === undefined) {
    return res.status(400).send({
      message: "droplocation cannot be empty for order!",
    });
  }
  if (pickupLocation === undefined) {
    return res.status(400).send({
      message: "pickup location cannot be empty for order!",
    });
  }
  if (pickupLocation === dropLocation) {
    return res.status(400).send({
      message: "drop location cannot be same as pickup location!",
    });
  }

  res.send({cost: getEstimatedCost(pickupLocation, dropLocation)});
}