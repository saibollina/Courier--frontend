import db from "../models/index.js";
import {checkDeliveredInTime, getEstimatedCost} from "../utils/deliveryCostEstimater.js";
import Sequelize from "sequelize";
const Order = db.order;
const Op = db.Sequelize.Op;

export const create = async (req, res) => {
  console.log(req.body)
  if (req.body.customerID === undefined || !req.body.customerID) {
    return res.status(400).send({
      message: "customerID cannot be empty for order!",
    });
    
  }
  if (req.body.orderedBy === undefined || !req.body.orderedBy) {
    return res.status(400).send({
      message: "orderedBy cannot be empty for order!",
    });
  }
  if (req.body.dropLocation === undefined || !req.body.dropLocation.length) {
    return res.status(400).send({
        message: "droplocation cannot be empty for order!",
      });
  }
  if (req.body.pickupLocation === undefined || !req.body.pickupLocation.length) {
    return res.status(400).send({
      message: "pickup location cannot be empty for order!",
    });
  }
  if (req.body.cost === undefined || !req.body.cost) {
    return res.status(400).send({
      message: "cost cannot be empty for order!",
    });
  }
  if (req.body.receiverFirstName === undefined || !req.body.receiverFirstName.length) {
    return res.status(400).send({
      message: "Receiver firstname cannot be empty for order!",
    });
  }
  if (req.body.receiverLastName === undefined || !req.body.receiverLastName.length) {
    return res.status(400).send({
      message: "Receiver lastname cannot be empty for order!",
    });
  }
  if (req.body.receiverPhoneNumber === undefined || !req.body.receiverPhoneNumber.length || req.body.receiverPhoneNumber.length!=10) {
    return res.status(400).send({
      message: "Please check Receiver phone number",
    });
  }
  if (req.body.parcelName === undefined) {
    return res.status(400).send({
      message: "parcelName cannot be empty for order!",
    });
  }
  if (req.body.estimatedDeliveryTime === undefined) {
    return res.status(400).send({
      message: "estimatedDeliveryTime cannot be empty for order!",
    });
  }
  const order = {
    customerID:req.body.customerID,
    orderedBy :req.body.orderedBy,
    orderPlacedTime: new Date(),
    cost: req.body.cost,
    pickupLocation:req.body.pickupLocation,
    dropLocation:req.body.dropLocation,
    status:'Order-placed',
    receiverFirstName: req.body.receiverFirstName,
    receiverLastName: req.body.receiverLastName,
    receiverPhoneNumber: req.body.receiverPhoneNumber,
    parcelName: req.body.parcelName,
    estimatedDeliveryTime: req.body.estimatedDeliveryTime
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

  Order.findAll({
    include: [
      {
        model: db.customer,
        as: "orderedByCustomer",
        attributes: [
          [Sequelize.literal('CONCAT(`orderedByCustomer`.`firstName`, " ", `orderedByCustomer`.`lastName`)'), 'name'],
          'email',
          'firstName',
          'lastName'
        ],
      },
      {
        model: db.user,
        as: "orderedByClerk",
        attributes: [
          [Sequelize.literal('CONCAT(`orderedByClerk`.`firstName`, " ", `orderedByClerk`.`lastName`)'), 'name'],
        ],
      },
      {
        model: db.user,
        as: "orderAssignedTo",
        attributes: [
          [Sequelize.literal('CONCAT(`orderAssignedTo`.`firstName`, " ", `orderAssignedTo`.`lastName`)'), 'assignedTo'],
          'id',
          'email',
          'isAvailable',
          'firstName',
          'lastName',
        ],
      },
    ],
    attributes: [
      'id',
      'status',
      'receiverPhoneNumber',
      'receiverLastName',
      'receiverFirstName',
      'pickedUpBy',
      'cost',
      'estimatedDeliveryTime'
    ],
    where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    });
};

export const estimateDeliveryCost = async (req, res) => {
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

  res.send(await getEstimatedCost(pickupLocation, dropLocation));
}

export const findAllOrdersPlacedByClerk = (req,res) =>{
  const id = req.params.clerkId;
  var condition = id ? { orderedBy: id } : null;

  Order.findAll({
    include: [
      {
        model: db.customer,
        as: "orderedByCustomer",
        attributes: [
          [Sequelize.literal('CONCAT(`orderedByCustomer`.`firstName`, " ", `orderedByCustomer`.`lastName`)'), 'name'],
          'email',
          'firstName',
          'lastName'
        ],
      },
      {
        model: db.user,
        as: "orderedByClerk",
        attributes: [
          [Sequelize.literal('CONCAT(`orderedByClerk`.`firstName`, " ", `orderedByClerk`.`lastName`)'), 'name'],
        ],
      },
      {
        model: db.user,
        as: "orderAssignedTo",
        attributes: [
          [Sequelize.literal('CONCAT(`orderAssignedTo`.`firstName`, " ", `orderAssignedTo`.`lastName`)'), 'assignedTo'],
          'id',
          'email',
          'isAvailable',
          'firstName',
          'lastName',
        ],
      },
    ],
    attributes: [
      'id',
      'status',
      'receiverPhoneNumber',
      'receiverLastName',
      'receiverFirstName',
      'pickedUpBy',
      'cost',
      'estimatedDeliveryTime',
    ],
    where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving orders.",
      });
    });
}
export const findAllOrdersAssignedToDP = (req,res) =>{
  const id = req.params.deliveryPersonId;
  var condition = id ? { pickedUpBy: parseInt(id,10) } : null;

  Order.findAll({ 
    include: [
      {
        model: db.customer,
        as: "orderedByCustomer",
        attributes: [
          [Sequelize.literal('CONCAT(`orderedByCustomer`.`firstName`, " ", `orderedByCustomer`.`lastName`)'), 'name'],
          'email',
          'firstName',
          'lastName',
          'phoneNumber',
        ],
      },
      {
        model: db.user,
        as: "orderedByClerk",
        attributes: [
          [Sequelize.literal('CONCAT(`orderedByClerk`.`firstName`, " ", `orderedByClerk`.`lastName`)'), 'name'],
        ],
      },
      {
        model: db.user,
        as: "orderAssignedTo",
        attributes: [
          [Sequelize.literal('CONCAT(`orderAssignedTo`.`firstName`, " ", `orderAssignedTo`.`lastName`)'), 'assignedTo'],
          'id',
          'email',
          'isAvailable',
          'firstName',
          'lastName',
        ],
      },
    ],
    attributes: [
      'id',
      'status',
      'receiverPhoneNumber',
      'receiverLastName',
      'receiverFirstName',
      'pickedUpBy',
      'pickupLocation',
      'dropLocation',
      'cost',
      'estimatedDeliveryTime',
    ],
    where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving orders.",
      });
    });
}

export const findOne=(req,res)=>{
  const id = req.params.id;
  var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;
  console.log("finding one oreder", req.query.id)
  Order.findOne({
    include: [
      {
        model: db.customer,
        as: "orderedByCustomer",
        attributes: [
          [Sequelize.literal('CONCAT(`orderedByCustomer`.`firstName`, " ", `orderedByCustomer`.`lastName`)'), 'name'],
          'email',
          'firstName',
          'lastName',
          'phoneNumber',
        ],
      },
      {
        model: db.user,
        as: "orderedByClerk",
        attributes: [
          [Sequelize.literal('CONCAT(`orderedByClerk`.`firstName`, " ", `orderedByClerk`.`lastName`)'), 'name'],
        ],
      },
      {
        model: db.user,
        as: "orderAssignedTo",
        attributes: [
          [Sequelize.literal('CONCAT(`orderAssignedTo`.`firstName`, " ", `orderAssignedTo`.`lastName`)'), 'assignedTo'],
          'id',
          'email',
          'isAvailable',
          'firstName',
          'lastName',
          'phoneNumber'
        ],
      },
    ],
    attributes: [
      'id',
      'status',
      'receiverPhoneNumber',
      'receiverLastName',
      'receiverFirstName',
      'pickedUpBy',
      'dropLocation',
      'pickupLocation',
      'deliveredInTime',
      'estimatedDeliveryTime',
      'dropTime',
      'pickUpTime',
      'cost',
      'parcelName'
    ],
    where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    });
}

export const updateOrderDetails=(req,res)=>{
  const id = req.params.id;
  console.log('req==>', req.body);
  Order.update(req.body, {
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "Order was updated successfully.",
        });
      } else {
        res.status(404).send({
          message: `Cannot update Order with id = ${id}. Maybe Order was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Order with id =" + id,
      });
    });
}

export const pickedup=(req,res)=>{
  const id = req.params.id;
  console.log('req==>', req.body);
  Order.update({pickUpTime: Sequelize.literal('CURRENT_TIMESTAMP'),status:"Picked-Up"}, {
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "Order was updated successfully.",
        });
      } else {
        res.status(404).send({
          message: `Cannot update Order with id = ${id}. Maybe Order was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Order with id =" + id,
      });
    });
}

export const delivered= async (req,res)=>{
  const id = req.params.id;
  const order  = await Order.findByPk(id)
  const current_time = new Date();
  const deliveredInTime = checkDeliveredInTime(order.pickUpTime,current_time,order.estimatedDeliveryTime)
  Order.update({dropTime: Sequelize.literal('CURRENT_TIMESTAMP'),status:"Delivered", deliveredInTime: deliveredInTime? "Yes": "No",bonus: deliveredInTime ? order.cost*0.1 : 0}, {
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "Order was updated successfully.",
        });
      } else {
        res.status(404).send({
          message: `Cannot update Order with id = ${id}. Maybe Order was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Order with id =" + id,
      });
    });
}

export const deleteOrder = (req, res) => {
  const id = req.params.id;

  Order.destroy({
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "Order was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Order with id = ${id}. Maybe Order was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete Order with id = " + id,
      });
    });
};