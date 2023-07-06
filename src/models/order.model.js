export const Order = (sequelize, Sequelize) => {
  const Order = sequelize.define("order", {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey:true,
      autoIncrement: true,
    },
    coustomerID: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    orderedBy: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    orderPlacedTime: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    cost: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    pickedUpBy: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    pickupLocation: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    dropLocation: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    pickUpTime: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    dropTime: {
      type: Sequelize.DATE,
      allowNull:true
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    estimatedDeliveryTime: {
      type: Sequelize.INTEGER,
      allowNull: true,
    }
  });

  return Order;
};
