const { Sequelize } = require("sequelize");
const config = require("../config/database"); // Создайте этот файл

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    port: config.port,
    dialect: "postgres",
    schema: config.schema,
    logging: console.log,
    define: {
        underscored: true,
        timestamps: true
      }
  }
);

  // Test the connection to the database
async function testConnection() {
    try {
      await sequelize.authenticate();
      console.log('Ühendus DB-ga on olemas');
    } catch (error) {
      console.error('Ühendust ei ole:', error);
      process.exit(1); 
    }
  }
  
  testConnection();

  const models = {
    User: require("./User")(sequelize),
    Book: require("./Book")(sequelize),
    Comment: require("./Comment")(sequelize),
    Log: require("./Log")(sequelize),
    Author: require("./Author")(sequelize), 
    Category: require("./Category")(sequelize) 
  };
  
  models.Book.hasMany(models.Comment, { foreignKey: 'book_id' });
  models.Comment.belongsTo(models.Book, { foreignKey: 'book_id' });
  
  models.User.hasMany(models.Comment, { foreignKey: 'user_id' });
  models.Comment.belongsTo(models.User, { foreignKey: 'user_id' });
  
  models.User.hasMany(models.Log, { foreignKey: 'user_id' });
  models.Log.belongsTo(models.User, { foreignKey: 'user_id' });

  models.Book.belongsToMany(models.Author, { 
    through: 'book_authors',
    foreignKey: 'book_id',
    otherKey: 'author_id'
  });
  
  models.Author.belongsToMany(models.Book, {
    through: 'book_authors',
    foreignKey: 'author_id',
    otherKey: 'book_id'
  });
  
  models.Book.belongsTo(models.Category, {
    foreignKey: 'category_id'
  });

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Tables synced successfully!");
  })
  .catch((error) => {
    console.error("Sync error:", error);
  });

module.exports = {
  ...models,
  sequelize
};