const express = require('express');
const app = express();
const cors = require('cors'); // Import the CORS middleware
const PORT = process.env.PORT || 5000;
const models = require('./config/models_sync');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger/swagger'); // Import the Swagger configuration
// Enable CORS for all routes (you can also configure more specific options)
app.use(cors());

app.use(express.json());

// Serve the Swagger UI documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Define your API routes with a base URL
const authRouter = require('./controllers/auth'); // Import the auth router
app.use('/', authRouter);

app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});
