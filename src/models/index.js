import { DB, USER, PASSWORD, HOST, dialect as _dialect, pool as _pool } from "../config/db.config.js";
import Sequelize from "sequelize";
import { Place } from './place.model.js';
import { Plan } from './plan.model.js';
import { User } from './user.model.js';
import { Session } from './session.model.js';
import { Order } from './order.model.js';

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

db.place = Place(sequelize,Sequelize);
db.plan = Plan(sequelize,Sequelize);
db.user = User(sequelize,Sequelize);
db.session = Session(sequelize,Sequelize);
db.order = Order(sequelize,Sequelize);


// foreign key for place
db.plan.hasMany(
  db.place,
  { as: "place" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

// foreign key for booking
db.user.hasMany(
  db.order,
  { as: "order" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.plan.hasMany(
  db.order,
  { as: "order" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

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
