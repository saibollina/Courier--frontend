import db from "../models/index.js";

const Place = db.place;
const Op = db.Sequelize.Op;

export const createPlace = (req, res) =>{

   // Validate request
   if (req.body.name === undefined) {
    const error = new Error("name cannot be empty for place!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.description === undefined) {
    const error = new Error("description cannot be empty for place!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.image === undefined) {
    const error = new Error("image cannot be empty for place!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.category === undefined) {
    const error = new Error("category cannot be empty for place!");
    error.statusCode = 400;
    throw error;
  }

  const place = {
    name: req.body.name,
    description: req.body.description,
    rating: req.body.rating,
    image: req.body.image,
    planId: req.body.plan_id,
    category: req.body.category
  };

  Place.create(place)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Place.",
      });
    });

}

export const getAllPlaces = (req, res) =>{
    Place.findAll().then((data) => {
          res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Error retrieving Places"
        });
      });
}

export const getAllEvents = (req, res) =>{

  Place.findAll({ where: { category: 'event'} }).then((data) => {
        res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Error retrieving Events"
      });
    });
}

export const getAllHotels = (req, res) =>{
  Place.findAll({ where: { category: 'hotel'} }).then((data) => {
    res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Error retrieving Hotels"
      });
    });
}

export const getPlace = (req, res) =>{
    const id = req.params.placeId;
    console.log('id', id)
    Place.findByPk(id).then((data) => {
          res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Error retrieving Place with id=" + id
        });
      });
}

// Update a place by the id in the request
export const updatePlace = (req, res) => {
  const id = req.params.id;

  Place.update(req.body, {
    where: { id: id },
  })
    .then((data) => {
      if (data == 1) {
        res.send({
          message: "place was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update place with id=${id}. Maybe place was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating place with id=" + id,
      });
    });
};

// Delete a place with the specified id in the request
export const deletePlace = (req, res) => {
  const id = req.params.id;

  Place.destroy({
    where: { id: id },
  })
    .then((data) => {
      if (data == 1) {
        res.send({
          message: "place was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete place with id=${id}. Maybe place was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete place with id=" + id,
      });
    });
};

// Delete all places from the database.
export const deleteAllPlaces = (req, res) => {
  Place.destroy({
    where: {},
    truncate: false,
  })
    .then((data) => {
      res.send({ message: `${data} places were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all places.",
      });
    });
};

export const searchPlace = (req, res) => {
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
  Place.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving places.",
      });
    });
};