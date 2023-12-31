import axios from 'axios';
import dotenv from "dotenv";
dotenv.config();

const handleDeleteClick = async (taskId, fetchUncompletedTasks, fetchCompletedTasks) => {
    try {
      // Send a DELETE request to remove the task with the given ID
        await axios.delete(`/api/?taskId=${taskId}`, {
        headers: {
          API_KEY: process.env.API_KEY,
        },
      });
      fetchUncompletedTasks();
      fetchCompletedTasks();
    } catch (error) {
      console.error(`Error deleting task with ID ${taskId}:`, error);
    }

};

export default handleDeleteClick;