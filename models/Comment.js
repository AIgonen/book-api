const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("Comment", {
    comment_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    book_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "books",
        key: "book_id"
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "user_id"
      }
    }
  }, {
    tableName: "comments",
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    schema: "books",
    underscored: true
  });
};