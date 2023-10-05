import axios from 'axios';
import dotenv from "dotenv";
dotenv.config();

const handleAddClick = async (formState, setFormState, fetchUncompletedTasks, fetchCompletedTasks) => {
const newTitle = formState.Title;

  //   Create a new todo object
  const newTodo = {
    id: Date.now(),
    title: newTitle
  };

  try {
    await axios.post('/api/', newTodo, {
      headers: {
        API_KEY: process.env.API_KEY,
      },
    });
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
