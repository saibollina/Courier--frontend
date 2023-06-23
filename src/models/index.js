import { DB, USER, PASSWORD, HOST, dialect as _dialect, pool as _pool } from "../config/db.config.js";
import Sequelize from "sequelize";
import { User } from './user.model.js';
import { Session } from './session.model.js';

const sequelize = new Sequelize(DB, USER, PASSWORD, {
  host: HOST,
  dialect: _dialect,
  define: {
    timestamps: false
    },
  pool: {
    max: _pool.max,
    min: _pool.min,
    acquire: _pool.acquire,
    idle: _pool.idle,
  },
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = User(sequelize,Sequelize);
db.session = Session(sequelize,Sequelize);

// foreign key for session
db.user.hasMany(
  db.session,
  { as: "session" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.session.belongsTo(
  db.user,
  { as: "user" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);


export default db;
