const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("Book", {
    book_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    publication_year: {
      type: DataTypes.INTEGER
    },
    category_id: {
      type: DataTypes.INTEGER
    }
  }, {
    tableName: "books",
  timestamps: false,
  schema: "books"
  });
};