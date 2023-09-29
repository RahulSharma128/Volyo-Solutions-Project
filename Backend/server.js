const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require('cors');

const corsOptions = {
  origin: 'http://localhost:3000', // Replace with the actual origin of your React app
};

app.use(cors(corsOptions));
app.use(express.json());

const db = mysql.createConnection({
  user: 'root',
  host: '127.0.0.1', // Fix the typo here
  password: '',
  database: 'react-todo-list'
});




app.get('/user', (req, res) => {
  // Replace with your SQL query to retrieve data from the database
  db.query("SELECT * FROM storage_todo", (err, results) => {
    if (err) {
      console.error("Error retrieving data:", err);
      res.status(500).json({ status: 'error', message: 'Error retrieving data' });
    } else {
      console.log("Data retrieved successfully");
      res.status(200).json({ status: 'success', data: results });
    }
  });
});



app.get('/complete', (req, res) => {
  // Replace with your SQL query to retrieve data from the database
  db.query("SELECT * FROM storage_todo_completed", (err, results) => {
    if (err) {
      console.error("Error retrieving data:", err);
      res.status(500).json({ status: 'error', message: 'Error retrieving data' });
    } else {
      console.log("Data retrieved successfully");
      res.status(200).json({ status: 'success', data: results });
    }
  });
});

app.post('/user', (req, res) => {
  const NotComplete = req.body.NotComplete;

  if (!NotComplete) {
    return res.status(400).json({ error: 'NotComplete is required' });
  }

  db.query("INSERT INTO storage_todo (NotCompleted) VALUES (?)", [NotComplete], (err, result) => {
    if (err) {
      console.error("Database Error:", err); // Log the error
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      console.log("Value is inserted");
      res.status(200).json({ message: 'Value is inserted' });
    }
  });
});


// Add this route to your Express server
app.delete('/delete/:id', (req, res) => {
  const taskId = req.params.id;

  // Replace 'storage_todo' with your actual table name
  db.query("DELETE FROM storage_todo WHERE id = ?", [taskId], (err, result) => {
    if (err) {
      console.error("Database Error:", err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      console.log("Task deleted successfully");
      res.status(200).json({ message: 'Task deleted successfully' });
    }
  });
});

app.post('/complete/:id', (req, res) => {
  const taskId = req.params.id;

  // Move the task from 'storage_todo' to 'storage_todo_completed'
  db.query("INSERT INTO storage_todo_completed SELECT * FROM storage_todo WHERE id = ?", [taskId], (err, result) => {
    if (err) {
      console.error("Error moving task to completed table:", err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      console.log("Task moved to completed table");
      
      // Now delete the task from 'storage_todo' table
      db.query("DELETE FROM storage_todo WHERE id = ?", [taskId], (err, deleteResult) => {
        if (err) {
          console.error("Error deleting task from main table:", err);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          console.log("Task deleted from main table");
          res.status(200).json({ message: 'Task moved to completed table and deleted from main table' });
        }
      });
    }
  });
});

app.delete('/compdelete/:id', (req, res) => {
  const taskId = req.params.id;

  // Replace 'storage_todo' with your actual table name
  db.query("DELETE FROM storage_todo_completed WHERE id = ?", [taskId], (err, result) => {
    if (err) {
      console.error("Database Error:", err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      console.log("Task deleted successfully");
      res.status(200).json({ message: 'Task deleted successfully' });
    }
  });
});




app.listen(8081, () => {
  console.log("Server online");
});