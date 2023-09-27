// public/handleAddClick.js
import axios from 'axios';

const handleAddClick = async (formState, setFormState, fetchUncompletedTasks, fetchCompletedTasks) => {
  // Values from formState
  const newID = formState.ID;
  const newTitle = formState.Title;

  // Create a new todo object
  const newTodo = {
    id: Date.now(),
    title: newTitle,
    completed: false,
  };


  try {
    // Logic to get all the array ids
    var arr1 = await axios.get('http://localhost:3001/todos');
    var arr2 = await axios.get('http://localhost:3001/completed');
    const idsArray1 = arr1.data.map(item => item.id);
    const idsArray2 = arr2.data.map(item => item.id);
    const idsArray = [...idsArray1, ...idsArray2];
    console.log(idsArray);

    if (!idsArray.includes(Number(newID))) {
      // Send a POST request to add the new task to your local JSON server
      await axios.post('http://localhost:3001/todos', newTodo);
    } else {
      alert("This ID already exists");
      return;
    }

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
