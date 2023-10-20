// swagger/swagger.js
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  swaggerDefinition: {
    swagger: '2.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'API documentation using Swagger',
    },
    basePath: '/',
  },
  apis: ['./routes/pages.js'], // Use the correct path to your route files
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
