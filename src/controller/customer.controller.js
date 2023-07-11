import db from "../models/index.js"
import Sequelize from "sequelize";
const Customer = db.customer;


export const create = async (req, res) => {
    // Validate request
    if (req.body.firstName === undefined || !req.body.firstName.length) {
        return res.status(400).send({
          message: "First name cannot be empty for user!",
        });
      }
      if (req.body.lastName === undefined || !req.body.lastName.length) {
        return res.status(400).send({
          message: "Last name cannot be empty for user!",
        });
      }
      if (req.body.email === undefined || !req.body.email.length) {
        return res.status(400).send({
          message: "Email cannot be empty for user!",
        });
      }
      if (req.body.gender === undefined || !req.body.gender.length) {
        return res.status(400).send({
          message: "Gender cannot be empty for user!",
        });
      }
      if (req.body.role === undefined || !req.body.role) {
        return res.status(400).send({
          message: "role cannot be empty for user!",
        });
      }
    
  
    // find by email
    await Customer.findOne({
      where: {
        email: req.body.email,
      },
    })
      .then(async (data) => {
        if (data) {
          return res.status(400).send({
            message: "This email is already in use.",
          });
        } else {
          console.log("email not found");
  
  
          // Create a customer
          const customer = {
            id: req.body.id,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            role: req.body.role || 4,
            gender: req.body.gender
          };
  
          // Save customer in the database
          await Customer.create(customer)
            .catch((err) => {
              console.log(err);
              res.status(500).send({
                message: err.message,
              });
            });
        }
      })
      .catch((err) => {
        return err.message || "Error retrieving User with email=" + email;
      });
  };

export const findByEmail = (req, res) => {
    const email = req.params.email;
  
    Customer.findOne({
      attributes: ['email', 'firstName','lastName','role','id'],
      where: {
        email: email,
      },
    })
      .then((data) => {
        if (data) {
          res.send(data);
        } else {
          // res.send({ email: "not found" });
          res.status(404).send({
            message: `Cannot find User with email=${email}.`
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Error retrieving User with email=" + email,
        });
      });
  };

export const findAll = (req,res)=>{

    Customer.findAll({
        attributes: ['email', 'firstName','lastName','role','id',
    [Sequelize.fn("concat", Sequelize.col("firstname"),' ',Sequelize.col("lastname")),'name']]})
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving orders.",
        });
      });
  }

  export const findOne = (req,res)=>{
    const id = req.params.id
    Customer.findByPk(id,{
        attributes: ['email', 'firstName','lastName','role','id',
    [Sequelize.fn("concat", Sequelize.col("firstname"),' ',Sequelize.col("lastname")),'name']]})
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving orders.",
        });
      });
  }