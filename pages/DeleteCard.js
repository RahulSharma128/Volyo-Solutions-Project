const handleDeleteClick = async (taskId, isCompleted) => {
    if (isCompleted) {
    try {
      // Send a DELETE request to remove the task with the given ID
      await axios.delete(`http://localhost:3001/todos/${taskId}`);

      // Refresh the task lists
      fetchUncompletedTasks();
      fetchCompletedTasks();
    } catch (error) {
      console.error(`Error deleting task with ID ${taskId}:`, error);
    }
   }else{
      try {
        // Send a DELETE request to remove the task with the given ID
        await axios.delete(`http://localhost:3001/completed/${taskId}`);
  
        // Refresh the task lists
        fetchUncompletedTasks();
        fetchCompletedTasks();
      } catch (error) {
        console.error(`Error deleting task with ID ${taskId}:`, error);
      }
    
  }
}
export default handleDeleteClick;