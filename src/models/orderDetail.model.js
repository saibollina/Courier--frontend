export const OrderDetail = (sequelize, Sequelize) => {
  const OrderDetail = sequelize.define("orderDetail", {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    orderId: {
      type: Sequelize.INTEGER,
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
    pickedUpLocation: {
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

  return OrderDetail;
};