export const Customer = (sequelize, Sequelize) => {
    const Customer = sequelize.define("customers", {
      id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      role:{
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      gender:{
        type: Sequelize.STRING,
        allowNull: false,
      }
    });
  
    return Customer;
  };
  