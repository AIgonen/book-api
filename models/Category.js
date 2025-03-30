const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("Category", {
    category_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    tableName: "categories",
    schema: "books",
    timestamps: false
  });
};