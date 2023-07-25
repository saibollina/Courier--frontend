export const Order = (sequelize, Sequelize) => {
  const Order = sequelize.define("order", {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey:true,
      autoIncrement: true,
    },
    customerID: {
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
    },
    parcelName:{
      type: Sequelize.STRING,
      allowNull: false,
    },
    receiverFirstName:{
      type: Sequelize.STRING,
      allowNull: false,
    },
    receiverLastName:{
      type: Sequelize.STRING,
      allowNull: false,
    },
    receiverPhoneNumber:{
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: "You must enter Phone Number" },
        len: { args: [10,10], msg: 'Phone Number is invalid' },
      }
    },
    bonus: {
      type: Sequelize.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    deliveredInTime: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "NO",
    }
  });

  return Order;
};
