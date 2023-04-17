const sequelize = require("sequelize");
const dataType = sequelize.DataTypes;
module.exports = (sequelize, Sequelize) => {
  const message = sequelize.define("message", {
    id: {
      type: dataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // seller_id: {
    //   type: dataType.INTEGER,
    // },
    send_id: {
      type: dataType.STRING,
      allowNull: false,
    },
    rec_id: {
      type: dataType.STRING,
      allowNull: false,
    },
    message: {
      type: dataType.STRING,
    },
    pro_id: {
      type: dataType.INTEGER,
      allowNull: false,
    },
    sender_name: {
      type: dataType.STRING,
      allowNull: false,
    },
  });

  return message;
};
