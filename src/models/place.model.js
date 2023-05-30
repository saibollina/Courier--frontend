export const Place = (sequelize, Sequelize) => {
  const Place = sequelize.define("place", {
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
    rating:{
      type: Sequelize.INTEGER,
      allowNull: true,
      default: 0,
    },
    image: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    category: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    },
    {
    timestamps: true, 
    });
    return Place;
  };
  