import express from 'express';
import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3002; // Change this to your desired port

// MySQL database connection
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
});

// Connect to the database
const abc = () => {
    db.connect((err) => {
        if (err) {
            console.error('Error connecting to MySQL database:', err);
        } else {
            console.log('Connected to MySQL database');
        }
    });

    app.get('/todos', (req, res) => {
        db.query('SELECT * FROM todos', (err, results) => {
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
};

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

export default abc;