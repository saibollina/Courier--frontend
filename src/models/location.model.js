export const Location = (sequelize, Sequelize) => {
    const Location = sequelize.define("location", {
        source: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true,
        },
        destination: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true,
        },
    });
    return Location;
  };