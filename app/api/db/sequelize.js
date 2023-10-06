import Task from './model.js';

export async function getAllTasks() {
  try {
    const tasks = await Task.findAll();
    return tasks;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
}

export async function addTask(newTaskData) {
  try {
    const createdTask = await Task.create(newTaskData);
    return createdTask;
  } catch (error) {
    console.error('Error adding task:', error);
    throw error;
  }
}

export async function updateTask(taskId, updatedData) {
  try {
    const [rowsUpdated, updatedTasks] = await Task.update(updatedData, {
      where: { id: taskId },
    });

    if (rowsUpdated === 0) {
      throw new Error(`Task with ID ${taskId} not found Or Already Updated.`);
    }
    else return ("updated");

  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
}
export async function deleteTask(taskId) {
  try {
    const deletedCount = await Task.destroy({
      where: { id: taskId },
    });

    if (deletedCount === 0) {
      throw new Error(`Task with ID ${taskId} not found.`);
    }

    return `Task with ID ${taskId} has been deleted successfully.`;
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
}

