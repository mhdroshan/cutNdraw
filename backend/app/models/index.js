const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user.js")(sequelize, Sequelize);
db.messages = require("./messages")(sequelize, Sequelize);
db.products = require("./product.js")(sequelize, Sequelize);

// db.users.hasMany(db.products, {
//   onDelete: "cascade",
// });
// db.products.belongsTo(db.users);
// // next table
module.exports = db;
