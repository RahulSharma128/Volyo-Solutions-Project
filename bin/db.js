// public/handleAddClick.mjs
import express from 'express';
import mysql from 'mysql2';
import dotenv from 'dotenv';


export default function abc(){

    const bodyParser = require('body-parser'); 
    // Use middleware to parse JSON and URL-encoded data
    dotenv.config();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    
    
    const app = express();
    const port = 5000; // Change this to your desired port
    
    // MySQL database connection
    const db = mysql.createConnection({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE,
    });

    db.connect((err) => {
        if (err) {
            console.error('Error connecting to MySQL database:', err);
        } else {
            console.log('Connected to MySQL database');
        }
    });

    app.get('/', (req, res) => {
        db.query('SELECT * FROM tasks', (err, results) => {
            if (err) {
                console.error('Error querying the database:', err);
                res.status(500).json({ error: 'An error occurred while fetching data.' });
            } else {
                // Send the results as a JSON response
                res.status(200).json(results);
            }
        });
        res;
    });

    // app.post('/', (req, res) => {
    //     const postData = req.body;
      
    //     // Process the data or perform actions here
    //     // For example, you can save data to a database
      
    //     // Send a response back to the client
    //     res.status(201).json({ message: 'Data received successfully', data: postData });
    //   });
      app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}
