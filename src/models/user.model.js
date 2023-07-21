export const User = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
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
    password: {
      type: Sequelize.BLOB,
      allowNull: false,
    },
    salt: {
      type: Sequelize.BLOB,
      allowNull: false,
    },
    role:{
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    isAvailable:{
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    gender:{
      type: Sequelize.STRING,
      allowNull: false,
    },
    phoneNumber:{
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1234567890,
    },
  });

  return User;
};
