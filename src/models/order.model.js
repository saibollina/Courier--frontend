export const Order = (sequelize, Sequelize) => {
    const Order = sequelize.define("order", {
        id:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        }
    },
    {
     timestamps: true, 
    });
    return Order;
  };
  