export const Plan =  (sequelize, Sequelize) => {
  const Plan = sequelize.define("plan", {
      id:{
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true
      },
      name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      starts_on: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      cost: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      ends_on: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      rating: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      image: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      from_place: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      to_place: {
        type: Sequelize.STRING,
        allowNull: true,
      }
  },
  {
   timestamps: true, 
  });
  return Plan;
};