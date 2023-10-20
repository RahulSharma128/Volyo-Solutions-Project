const express = require("express");
const app = express();
const cookie = require("cookie-parser");
const PORT = process.env.PORT||5000;
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger/swagger');


// const sequelize = require('./config/db');
// const PartnerTable = require('./models/partners_table');
// const PartnerUser = require('./models/partner_users');
// // Sync the models with the database
// sequelize.sync()
//   .then(() => {
//     console.log('Database is synchronized, associations created successfully.');
//     return PartnerUser.describe();
//   })
//   .then((attributes) => {
//     console.log('Associations for PartnerUser:');
//   })
//   .catch((error) => {
//     console.error('Error synchronizing the database:', error);
//   });
//app.use(cookie());

app.use(express.json());
app.use("/",require("./routes/pages"));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
//app.use("/api",require("./controllers/auth")) ;
app.listen(PORT);
