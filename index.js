//http://localhost:4000/api-docs/#/ 

const express = require("express");
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");

const swaggerJsDocs = YAML.load("./api.yaml");


const sequelize = require("./util/database");

require('dotenv').config();
const queryRoutes = require("./models/Query"); // Import your routes fill



// const options = {
//   customSiteTitle: "Your API Documentation",
//   securityDefinitions: {
//     apiKey: {
//       type: "apiKey",
//       name: "X-API-KEY",
//       in: "header",
//     },
//   },
// };
const app = express();
app.use(express.json());

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJsDocs));



app.use((req, res, next) => {
  const apiKey = req.get('X-API-KEY');
  console.log('Received API Key:', apiKey);
  console.log('Environment API Key:', process.env.API_KEY);

  if (apiKey && apiKey === process.env.API_KEY) {
    next(); // API key is valid, continue to the next middleware or route
  } else {
    console.log('Unauthorized access attempt.');
    res.status(401).json({ error: 'Unauthorized' }); // API key is invalid, return unauthorized error
  }
});





app.use("/tasks", queryRoutes); // Mount the routes under the "/tasks" endpoint



sequelize.authenticate()
  .then(() => {
    console.log('Database Connected!');
    return sequelize.sync(); // Sync models with the database after successful connection
  })
  .then(() => {
    console.log('Models synchronized with the database.');
    app.listen(4000, () => {
      console.log("The server is live on port 4000");
    });
  }).catch(err => {
    console.error('Unable to connect to the database:', err);
});

// app.listen(4000, () => {
//   console.log("The server is live on port 4000");
// });
