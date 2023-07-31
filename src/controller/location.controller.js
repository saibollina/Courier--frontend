import db from '../models/index.js';
import Sequelize from 'sequelize';
import { findShortestPath } from '../utils/deliveryCostEstimater.js';
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

export const findFullTripOfDelivery = async (req, res) =>{
  const dropLocation = req.query.dropLocation;
  const pickupLocation = req.query.pickupLocation;

  try {
    if (dropLocation === undefined) {
      const error = new Error("drop address cannot be empty for order!");
      error.statusCode = 400;
      throw error;
    } 
    if (pickupLocation === undefined) {
      const error = new Error("pickup address cannot be empty for order!");
      error.statusCode = 400;
      throw error;
    }
    const path = await findShortestPath(pickupLocation,dropLocation);
    if(path.numberOfHops){
      const officeToSource = await findShortestPath("3C",pickupLocation);
      const sourceToDestination = path
      const destinationToOffice = await findShortestPath(dropLocation,"3C");
  
      res.send({
        officeToSource,
        sourceToDestination,
        destinationToOffice
      })
    } else {
      res.status(500).send({
        message: "Error in finding path",
      })
    }
   
  }
  catch(e) {
    res.status(500).send({
      message: "Error in finding path",
    });
  }
}