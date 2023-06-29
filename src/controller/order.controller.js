import db from "../models/index.js";
const Order = db.order;
const OrderDetails = db.orderDetails
const Op = db.Sequelize.Op;

// Create and Save a new Order
export const create = async (req, res) => {
  // Validate request
  if (req.body.coustomerID === undefined) {
    const error = new Error("coustomerID cannot be empty for order!");
    error.statusCode = 400;
    throw error;
  }
  if (req.body.orderedBy === undefined) {
    const error = new Error("orderedBy cannot be empty for order!");
    error.statusCode = 400;
    throw error;
  }
  if (req.body.dropLocation === undefined) {
    const error = new Error("droplocation cannot be empty for order!");
    error.statusCode = 400;
    throw error;
  }
  if (req.body.pickedUpLocation === undefined) {
    const error = new Error("pickup location cannot be empty for order!");
    error.statusCode = 400;
    throw error;
  }
  if (req.body.cost === undefined) {
    const error = new Error("cost cannot be empty for order!");
    error.statusCode = 400;
    throw error;
  }
  const order = {
    coustomerID:req.body.coustomerID,
    orderedBy :req.body.orderedBy,
    orderPlacedTime: new Date(),
  }
  let orderId = null;
  await Order.create(order).then((data)=>{
    console.log('orderPlaced', data)
    orderId= data.dataValues.id
  }).catch((error)=> {
    console.log({error});
    res.status(500).send({
        message: "Cannot place order now",
      });
  });
  if( orderId){
    const orderDetails= {
      orderId:orderId,
      cost: req.body.cost,
      pickedUpLocation:req.body.pickedUpLocation,
      dropLocation:req.body.dropLocation,
      status:'Order-placed'
    }
    await OrderDetails.create(orderDetails).then((data)=> res.send(data))
    .catch((error)=>{
      console.log('deleting half baked order with orderID', orderId, error);
      Order.destroy({
        where: { id: orderId },
      })
        .then((number) => {
          if (number == 1) {
            res.send({
              message: "Order was deleted successfully!",
            });
          } else {
            res.send({
              message: `Cannot delete orderId with id = ${id}. Maybe Order was not found!`,
            });
          }
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message || "Could not delete Order with id = " + id,
          });
        });
    })
  }

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