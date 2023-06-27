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
    });
  
    return Order;
  };
  