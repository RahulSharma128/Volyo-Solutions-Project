const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require('swagger-ui-express');
const express = require('express');
const app = express();
const port = 4000; // Use a different port


const options={
    definition:{
        openapi:'3.0.0',
        info:{
            title:"NodeJs Todo-List Project",
            version:'1.0.0',
        },
        servers:[
            {
                url:'http://localhost:3000/'
            }
        ]
    },
    apis: ['./src/routes*.js'],
}


const swaggerSpecification = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecification));

app.listen(port, () => {
  console.log(`Swagger UI is running on port ${port}`);
});