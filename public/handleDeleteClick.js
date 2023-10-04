// public/handleDeleteClick.js
import axios from 'axios';

const handleDeleteClick = async (taskId, fetchUncompletedTasks, fetchCompletedTasks) => {
    try {
      // Send a DELETE request to remove the task with the given ID
      await axios.delete(`/api/?taskId=${taskId}`);
      fetchUncompletedTasks();
      fetchCompletedTasks();
    } catch (error) {
      console.error(`Error deleting task with ID ${taskId}:`, error);
    }

};

export default handleDeleteClick;