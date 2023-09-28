// public/handleAddClick.js
import axios from 'axios';

const handleAddClick = async (formState, setFormState, fetchUncompletedTasks, fetchCompletedTasks) => {
const newTitle = formState.Title;

  //   Create a new todo object
  const newTodo = {
    id: Date.now(),
    title: newTitle,
    completed: false,
  };

  try {
    await axios.post('http://localhost:3001/todos', newTodo);
    // Input fields
    setFormState({
      ID: '',
      Title: '',
    });
    // Refresh the task lists
    fetchUncompletedTasks();
    fetchCompletedTasks();
  } catch (error) {
    console.error('Error adding a new task:', error);
  }
};

export default handleAddClick;
