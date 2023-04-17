const sequelize = require("sequelize");
const dataType = sequelize.DataTypes;
module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    id: {
      type: dataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    u_name: {
      type: dataType.STRING,
    },
    u_email: {
      type: dataType.STRING,
      allowNull: false,
    },
    u_phone: {
      type: dataType.STRING,
      allowNull: false,
    },
    // u_age: {
    //   type: dataType.INTEGER,
    // },
    u_address: {
      type: dataType.STRING,
    },
    // u_pass: {
    //   type: dataType.STRING,
    //   allowNull: false,
    // },
    photo: {
      type: dataType.STRING,
    },
    verified: {
      type: dataType.BOOLEAN,
    },
    userId: {
      type: dataType.STRING,
    },
  });

  return User;
};
