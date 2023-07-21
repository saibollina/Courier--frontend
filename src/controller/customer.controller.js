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
      if (req.body.address === undefined || !req.body.address) {
        return res.status(400).send({
          message: "address cannot be empty for user!",
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
            gender: req.body.gender,
            phoneNumber: req.body.phoneNumber,
            address: req.body.address,
          };
  
          // Save customer in the database
          await Customer.create(customer).then((data)=>{
            return res.send(data);
          })
            .catch((err) => {
              console.log(err);
              res.status(500).send({
                message: err.message,
              });
            });
        }
      })
      .catch((err) => {
        return res.status(500).send({
          message: err.message || "Error retrieving User with email=" + email,
        });
      });
  };

export const findByEmail = (req, res) => {
    const email = req.params.email;
  
    Customer.findOne({
      attributes: ['email', 'firstName','lastName','role','id','address'],
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

  export const findOne = (req, res) => {
    const id = req.params.id;
  
    Customer.findOne({
      attributes: ['email', 'firstName','lastName','role','id'],
      where: {
        id: id,
      },
    })
      .then((data) => {
        if (data) {
          res.send(data);
        } else {
          // res.send({ email: "not found" });
          res.status(404).send({
            message: `Cannot find User with id=${id}.`
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Error retrieving User with id=" + id,
        });
      });
  };

  export const deleteCustomer = (req, res) => {
    const id = req.params.id;
  
    Customer.destroy({
      where: { id: id },
    })
      .then((number) => {
        if (number == 1) {
          res.send({
            message: "User was deleted successfully!",
          });
        } else {
          res.send({
            message: `Cannot delete User with id = ${id}. Maybe User was not found!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Could not delete User with id = " + id,
        });
      });
  };
  export const update = (req, res) => {
    const id = req.params.id;
  
    Customer.update(req.body, {
      where: { id: id },
    })
      .then((number) => {
        if (number == 1) {
          res.send({
            message: "Customer was updated successfully.",
          });
        } else {
          res.status(404).send({
            message: `Cannot update Customer with id = ${id}. Maybe Customer was not found or req.body is empty!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Error updating User with id =" + id,
        });
      });
  };