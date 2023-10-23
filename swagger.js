const swaggerJSDoc = require('swagger-jsdoc');
const YAML = require('js-yaml');
const fs = require('fs');

const yamlFile = fs.readFileSync('./api-doc.yaml', 'utf8');
const apiDoc = YAML.load(yamlFile);

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API Documentation',
      version: '1.0.0',
      description: 'API documentation for your project.',
    },
    paths: apiDoc.paths, // Merge paths
    components: apiDoc.components, // Merge components
  },
  apis: ['./controllers/auth.js'], // Specify the path to your API routes
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
