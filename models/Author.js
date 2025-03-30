const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("Author", {
    author_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: "authors",
    schema: "books",
    timestamps: false
  });
};