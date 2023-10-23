const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger'); // Import the Swagger configuration
app.use(express.json());

// Serve the Swagger UI documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Define your API routes with a base URL
const authRouter = require('./controllers/auth'); // Import the auth router
app.use('/', authRouter);

app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});
