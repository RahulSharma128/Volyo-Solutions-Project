const handleAddClick = async () => {
    // Values from  formState
    const newID = formState.ID;
    const newTitle = formState.Title;

    // Create a new todo object
    const newTodo = {
      id: Number(newID),
      title: newTitle,
      completed: false,
    };

    if (!newID || newID.trim() === "") {
      alert("Please Enter Task Id");
      return;
    }
  
    try {
    // logic to get all the array ids
    var arr1 = await axios.get('http://localhost:3001/todos');
    var arr2 = await axios.get('http://localhost:3001/completed');
    const idsArray1 = arr1.data.map(item => item.id);
    const idsArray2 = arr2.data.map(item => item.id);
    const idsArray=[...idsArray1,...idsArray2];
    console.log(idsArray);

    if (!idsArray.includes(Number(newID))){
    // Send a POST request to add the new task to your local JSON server
    await axios.post('http://localhost:3001/todos', newTodo);
    }else{
    alert("This ID is already exists");
    return;
}
//  input fields
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