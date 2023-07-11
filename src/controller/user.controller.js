import db from "../models/index.js";
import Sequelize from "sequelize";
import { encrypt, getSalt, hashPassword } from "../authentication/crypto.js";
const User = db.user;
const Session = db.session;
const Op = db.Sequelize.Op;

// Create and Save a new User
export const create = async (req, res) => {
  console.log(req.body.firstName.length)
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
  if (req.body.password === undefined || !req.body.password.length) {
    
    return res.status(400).send({
      message: "Password cannot be empty for user!",
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
  await User.findOne({
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

        let salt = await getSalt();
        let hash = await hashPassword(req.body.password, salt);

        // Create a User
        const user = {
          id: req.body.id,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: hash,
          salt: salt,
          role: req.body.role || 0,
          gender: req.body.gender
        };

        // Save User in the database
        await User.create(user)
          .then(async (data) => {
            // Create a Session for the new user
            let userId = data.id;

            let expireTime = new Date();
            expireTime.setDate(expireTime.getDate() + 1);

            const session = {
              email: req.body.email,
              userId: userId,
              expirationDate: expireTime,
            };
            await Session.create(session).then(async (data) => {
              let sessionId = data.id;
              let token = await encrypt(sessionId);
              let userInfo = {
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                id: user.id,
                token: token,
                role: user.role || 0
              };
              res.send(userInfo);
            });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).send({
              message: "This email is already in use.",
            });
          });
      }
    })
    .catch((err) => {
      return err.message || "Error retrieving User with email=" + email;
    });
};

// Retrieve all Users from the database.
export const findAll = (req, res) => {
  const roleId = req.query.userRole
  // const id = req.query.id;
  var condition = roleId ? { role: roleId } : null;

  User.findAll({
    attributes: ['email', 'firstName','lastName','role','id',
    [Sequelize.fn("concat", Sequelize.col("firstname"),' ',Sequelize.col("lastname")),'name']], 
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

// Find a single User with an id
export const findOne = (req, res) => {
  const id = req.params.id;

  User.findByPk(id,{
    attributes: ['email', 'firstName','lastName','role','id']
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find User with id = ${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving User with id = " + id,
      });
    });
};

// Find a single User with an email
export const findByEmail = (req, res) => {
  const email = req.params.email;

  User.findOne({
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

// Update a User by the id in the request
export const update = (req, res) => {
  const id = req.params.id;

  User.update(req.body, {
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "User was updated successfully.",
        });
      } else {
        res.status(404).send({
          message: `Cannot update User with id = ${id}. Maybe User was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating User with id =" + id,
      });
    });
};

// Delete a User with the specified id in the request
export const deleteUser = (req, res) => {
  const id = req.params.id;

  User.destroy({
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

// Delete all People from the database.
export const deleteAll = (req, res) => {
  User.destroy({
    where: {},
    truncate: false,
  })
    .then((number) => {
      res.send({ message: `${number} People were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all people.",
      });
    });
};

export const getAllDeliveryPersons = (req,res)=>{

  User.findAll({ where: { role: 2 , isAvailable: true} })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving orders.",
      });
    });
}