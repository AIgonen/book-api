const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("Log", {
    log_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    action_type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    details: {
      type: DataTypes.JSON
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "user_id"
      }
    }
  }, {
    tableName: "logs",
    timestamps: true,
    createdAt: 'created_at',
    schema: "books",
    underscored: true
  });
};