const express = require("express");
const Todo = require("./Todo");
const router = express.Router();
const { Op } = require('sequelize');

router.get('/fetch', async (req, res) => {
    try {
        const tasks = await Todo.findAll();
        res.status(200).json(tasks);
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.post("/addTask", async (req, res) => {
    try {
      const { tasks } = req.body;
      if (!tasks) {
        return res.status(400).json({ error: 'Task description is required.' });
      }
  
      // Create a new task using the Todo model
      const newTask = await Todo.create({ tasks });
      res.status(201).json({ message: 'Task added successfully.', task: newTask });
    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.post("/restoreTask", async (req, res) => {
    
    const {taskId}=req.body;
   
    try {
      
        
        const restoredRows = await Todo.restore({ where: { id: taskId } });
        console.log("heelllelee");
        if (restoredRows) {
            res.status(200).json({ message: 'Task restored successfully.' });
            console.log("IF");
        } else {
            res.status(404).json({ error: 'Soft-deleted task not found.' });
        }
  
      // Create a new task using the Todo model
      
    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }}
    
  );

  router.delete('/deleteTask/:id', async (req, res) => {
    const taskId = req.params.id;
    if (!taskId) {
        return res.status(400).json({ error: 'Task ID is required.' });
    }

    try {
        const deletedTask = await Todo.destroy({ where: { id: taskId } });
        if (deletedTask) {
            res.status(200).json({ message: 'Task soft deleted successfully.' });
        } else {
            res.status(404).json({ error: 'Task not found.' });
        }
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// router.put('/restoreTask/:id', async (req, res) => {
//     const taskId = req.params.id;
//     if (!taskId) {
//         return res.status(400).json({ error: 'Task ID is required.' });
//     }

//     try {
//         // Restore the task by setting isDeleted column to false
//         const [updatedRows] = await Todo.update({ isDeleted: false }, { where: { id: taskId, isDeleted: true } });
//         if (updatedRows > 0) {
//             res.status(200).json({ message: 'Task restored successfully.' });
//         } else {
//             res.status(404).json({ error: 'Soft-deleted task not found.' });
//         }
//     } catch (error) {
//         console.error('Database error:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

router.put("/completeTask/:id", async (req, res) => {
    const taskId = req.params.id;
    if (!taskId) {
        return res.status(400).json({ error: "Task ID is required." });
    }

    try {
        const [updatedRows] = await Todo.update({ complete: true }, { where: { id: taskId } });
        if (updatedRows > 0) {
            res.status(200).json({ message: "Task marked as complete." });
        } else {
            res.status(404).json({ error: "Task not found." });
        }
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
