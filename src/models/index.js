import { DB, USER, PASSWORD, HOST, dialect as _dialect, pool as _pool } from "../config/db.config.js";
import Sequelize from "sequelize";
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
db.user = User(sequelize,Sequelize);
db.session = Session(sequelize,Sequelize);
db.order  = Order(sequelize, Sequelize);


// foreign key for session
db.user.hasMany(
  db.session,
  { as: "session" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.session.belongsTo(
  db.user,
  { as: "user" },
  { foreignKey: { allowNull: false } }
);

db.user.hasMany(db.order,{
    as: 'ordersPlaced',
    foreignKey: 'coustomerID'
});

db.user.hasMany(db.order,{
  as: 'ordersMade',
  foreignKey: 'orderedBy'
});

db.user.hasMany(db.order,{
  as: 'deliveryBy',
  foreignKey: 'pickedUpBy'
});

db.order.belongsTo(db.user, {
  foreignKey: 'coustomerID',
  as: 'orderedByCustomer',
});

db.order.belongsTo(db.user, {
  foreignKey: 'orderedBy',
  as: 'orderedByClerk',
});
export default db;
