'use client'
 
import { useState, useEffect} from 'react'
import axios from 'axios';
import styles from './page.module.css';
import handleAddClick from 'pages/AddCard.js';
import handleDeleteClick from 'pages/DeleteCard.js';

const Home = () => {
  const [formState, setFormState] = useState({
    ID: '',
    Title: '',
  });

  const [uncompletedTasks, setUncompletedTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  const fetchUncompletedTasks = async () => {
    try {
      const response = await axios.get('http://localhost:3001/todos');
      setUncompletedTasks(response.data);
    } catch (error) {
      console.error('Error fetching uncompleted tasks:', error);
    }
  };

  const fetchCompletedTasks = async () => {
    try {
      const response = await axios.get('http://localhost:3001/completed');
      setCompletedTasks(response.data);
    } catch (error) {
      console.error('Error fetching completed tasks:', error);
    }
  };

  useEffect(() => {
    fetchUncompletedTasks();
    fetchCompletedTasks();
  }, []);


  
  const handleMarkClick = async (taskId) => {
    try {
  
      const res = await axios.get(`http://localhost:3001/todos/${taskId}`);

      // Send a DELETE request to remove the task with the given ID
      await axios.delete(`http://localhost:3001/todos/${taskId}`);

      await axios.post('http://localhost:3001/completed', res.data);
 
      fetchUncompletedTasks();
      fetchCompletedTasks();
    } catch (error) {
      console.error(`Error deleting task with ID ${taskId}:`, error);
    }
  }

  return (
    <main className={styles.main}>
      <div className={styles.todo}>
        <h3>Uncompleted Task</h3>
        <br />
        {uncompletedTasks && uncompletedTasks.map((task) => (
          <div key={task.id} className={styles.Items}>
            <p>ID: {task.id}</p>
            <p>Title: {task.title}</p>
            <button className={styles.button} onClick={() => handleDeleteClick(task.id,true)}>Delete</button>
            <button className={styles.button} onClick={() => handleMarkClick(task.id)}>Mark As Completed</button>
          </div>
          
        ))}
      </div>
  
      <div className={styles.todo}>
        <h3>Add Task</h3>
        <br />
        <div>
          <label>ID</label>
          <input
            type="text"
            name="id"
            value={formState.ID}
            onChange={(e) =>
              setFormState({ ...formState, ID: e.target.value })
            }
          />
        </div>
        <div>
          <label>Title</label>
          <input
            type="text"
            name="Title"
            value={formState.Title}
            onChange={(e) =>
              setFormState({ ...formState, Title: e.target.value })
            }
          />
        </div>
        <button onClick={handleAddClick}>Add</button>
      </div>
      <div className={styles.todo}>
        <h3>Completed Task</h3>
        <br />
        {completedTasks && completedTasks.map((task) => (
          <div key={task.id} className={styles.Items}>
            <p>ID: {task.id}</p>
            <p>Title: {task.title}</p>
            <button className={styles.button} onClick={() => handleDeleteClick(task.id,false)}>Delete</button>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Home;
