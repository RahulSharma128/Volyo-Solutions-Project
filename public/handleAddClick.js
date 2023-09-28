// public/handleAddClick.js
import axios from 'axios';

const handleAddClick = async (formState, setFormState, fetchUncompletedTasks, fetchCompletedTasks) => {
  // Values from formStatetitle
  const newTitle = formState.Title;
   // Values from formState id

  //   Create a new todo object
  const newTodo = {
    id: Date.now(),
    title: newTitle,
    completed: false,
  };

  if(!newTitle){
    alert("Please Enter a Task")
    return
  }

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
