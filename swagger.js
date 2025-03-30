const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Raamatute API",
      version: "1.0.0",
      description: "RESTful API raamatute haldamiseks JWT autentimisega"
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      },
      schemas: {
        Book: {
          type: "object",
          properties: {
            book_id: {
              type: "integer",
              description: "The book ID"
            },
            title: {
              type: "string",
              description: "The title of the book"
            },
            publication_year: {
              type: "integer",
              description: "The year the book was published"
            },
            category_id: {
              type: "integer",
              description: "The category ID of the book"
            }
          }
        },
        User: {
          type: "object",
          properties: {
            user_id: {
              type: "integer",
              description: "The user ID"
            },
            username: {
              type: "string",
              description: "The username of the user"
            },
            role: {
              type: "string",
              enum: ["Admin", "User"],
              description: "The role of the user"
            }
          }
        }
      }
    },
    security: [{ bearerAuth: [] }]
  },
  apis: ["./routes/*.js"]
};

const specs = swaggerJsdoc(options);
module.exports = specs;