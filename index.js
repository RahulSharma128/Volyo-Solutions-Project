//http://localhost:4000/api-docs/#/ 
require('dotenv').config();
const express = require("express");
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerJsDocs = YAML.load("./api.yaml");
const db = require("mysql");
const time_stamp = new Date(); 



const connection = db.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "todo_tasks"
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected to database");
});

const app = express();
app.use(express.json());
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJsDocs));

app.use((req, res, next) => {
  const apiKey = req.get('X-API-KEY');
  console.log('Received API Key:', apiKey);
  
  console.log("environment key:", process.env.API_KEY)



  if (apiKey && apiKey === process.env.API_KEY) {
    next(); // API key is valid, continue to the next middleware or route
  } else {
    res.status(401).json({ error: 'Unauthorized' }); // API key is invalid, return unauthorized error
  }
});

app.get("/status", (req, res) => {
  res.send(`working ${time_stamp}`);
});

app.get("/fetch", (req, res) => {
  const query = "SELECT * FROM todo_table";
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Database error:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.status(200).json(results);
    }
  });
});

app.post("/addTask", (req, res) => {
  const { tasks } = req.body;
  if (!tasks) {
    return res.status(400).json({ error: "Task description is required." });
  }
  const insertQuery = "INSERT INTO todo_table (tasks) VALUES (?)";
  connection.query(insertQuery, [tasks], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.status(201).json({ message: "Task added successfully." });
    }
  });
});

app.delete("/deleteTask/:id", (req, res) => {
  const taskId = req.params.id;
  if (!taskId) {
    return res.status(400).json({ error: "Task ID is required." });
  }
  const deleteQuery = "DELETE FROM todo_table WHERE id = ?";
  connection.query(deleteQuery, [taskId], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      if (results.affectedRows > 0) {
        res.status(200).json({ message: "Task deleted successfully." });
      } else {
        res.status(404).json({ error: "Task not found." });
      }
    }
  });
});

app.put("/completeTask/:id", (req, res) => {
  const taskId = req.params.id;
  if (!taskId) {
    return res.status(400).json({ error: "Task ID is required." });
  }
  const updateQuery = "UPDATE todo_table SET complete = 1 WHERE id = ?";
  connection.query(updateQuery, [taskId], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      if (results.affectedRows > 0) {
        res.status(200).json({ message: "Task marked as complete." });
      } else {
        res.status(404).json({ error: "Task not found." });
      }
    }
  });
});

app.listen(4000, () => {
  console.log("The server is live on port 4000");
});
