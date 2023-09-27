'use client'
 
import { useState, useEffect} from 'react'
import axios from 'axios';
import styles from './page.module.css';
import handleAddClick from '../../public/handleAddClick';
import handleDeleteClick from '../../public/handleDeleteClick';

const Home = () => {
  const [formState, setFormState] = useState({
    ID: Date.now(),
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

  const handleAddClickWrapper = () => {
    handleAddClick(formState, setFormState, fetchUncompletedTasks, fetchCompletedTasks);
  };

  const handleDeleteClickWrapper = (taskId, isCompleted) => {
    handleDeleteClick(taskId, isCompleted, fetchUncompletedTasks, fetchCompletedTasks);
  };

  const handleMarkClick = async (taskId) => {
    try {
      const res = await axios.get(`http://localhost:3001/todos/${taskId}`);
      await axios.delete(`http://localhost:3001/todos/${taskId}`);
      await axios.post('http://localhost:3001/completed', res.data);
      fetchUncompletedTasks();
      fetchCompletedTasks();
    } catch (error) {
      console.error(`Error marking task with ID ${taskId} as completed:`, error);
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.todo}>
        <h3>Uncompleted Task</h3>
        <br />
        {uncompletedTasks && uncompletedTasks.map((task) => (
          <div key={task.id} className={styles.Items}>
            <p>ID: {task.id}</p>
            <p>Title: {task.title}</p>
            <button className={styles.button} onClick={() => handleDeleteClickWrapper(task.id, true)}>Delete</button>
            <button className={styles.button} onClick={() => handleMarkClick(task.id)}>Mark As Completed</button>
          </div>
        ))}
      </div>

      <div className={styles.todo}>
        <h3>Add Task</h3>
        <br />
        <div>
          <label>Title</label>
          <input
            type="text"
            name="Title"
            value={formState.Title}
            onChange={(e) => setFormState({ ...formState, Title: e.target.value })}
          />
        </div>
        <button onClick={handleAddClickWrapper}>Add</button>
      </div>
      <div className={styles.todo}>
        <h3>Completed Task</h3>
        <br />
        {completedTasks && completedTasks.map((task) => (
          <div key={task.id} className={styles.Items}>
            <p>ID: {task.id}</p>
            <p>Title: {task.title}</p>
            <button className={styles.button} onClick={() => handleDeleteClickWrapper(task.id, false)}>Delete</button>
          </div>
        ))}
      </div>
    </main>
  );
};


export default Home;

