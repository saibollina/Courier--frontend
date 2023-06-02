
export const Day = (sequelize, Sequelize) => {
    const Day = sequelize.define('day', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      day: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
      },
      },
      {
        timestamps: true,
      });
      return Day;
}