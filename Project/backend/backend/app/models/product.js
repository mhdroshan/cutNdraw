const sequelize = require("sequelize");
const dataType = sequelize.DataTypes;
module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define("product", {
    id: {
      type: dataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // seller_id: {
    //   type: dataType.INTEGER,
    // },
    title: {
      type: dataType.STRING,
      allowNull: false,
    },
    description: {
      type: dataType.STRING,
    },
    catogary: {
      type: dataType.STRING,
      allowNull: false,
    },
    price: {
      type: dataType.INTEGER,
      allowNull: false,
    },
    p_photo: {
      type: dataType.BLOB,
    },
    photoContentType: {
      type: dataType.STRING,
    },
    userId: {
      type: dataType.STRING,
      allowNull: false,
    },
    rating: {
      type: dataType.INTEGER,
      
    },
  });

  return Product;
};
