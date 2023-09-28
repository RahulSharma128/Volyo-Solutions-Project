'use client'
 
import { useState, useEffect} from 'react'
import axios from 'axios';
import styles from './page.module.css';
import handleAddClick from '../../public/handleAddClick';
import handleDeleteClick from '../../public/handleDeleteClick';
import AlertComponent from '../../public/AlertComponent';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCheck, faCircleMinus } from "@fortawesome/free-solid-svg-icons";

const convertTime = (timestamp) => {  
  const date = new Date(timestamp);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  const formattedDate = `${day}-${month}-${year}`;
  const formattedTime = `${hours}:${minutes}:${seconds}`;
  return{
    formattedDate,formattedTime
}
};


const Home = () => {
  const [formState, setFormState] = useState({
    ID: Date.now(),
    Title: '',
  });

  const [uncompletedTasks, setUncompletedTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  const [alertSeverity, setAlertSeverity] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);


  //console.log(uncompletedTasks);
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
    fetchCompletedTasks()
  }, []);

  const handleAddClickWrapper = () => {

    if (!formState.Title) {
      console.log("Emtyp",formState.Title);
      setAlertSeverity('error');
      setAlertMessage('Please Enter Task!');
      setShowAlert(true);
      return
    }
    else{
    handleAddClick(formState, setFormState, fetchUncompletedTasks, fetchCompletedTasks);
    setAlertSeverity('success');
    setAlertMessage('Task is Succesfully Added');
    setShowAlert(true);
    return
  }};

  const handleDeleteClickWrapper = (taskId, isCompleted) => {
    handleDeleteClick(taskId, isCompleted, fetchUncompletedTasks, fetchCompletedTasks);
    setAlertSeverity('warning');
    setAlertMessage('Task Deleted!');
    setShowAlert(true);
  };

  const handleMarkClick = async (taskId) => {
    try {
      const res = await axios.get(`http://localhost:3001/todos/${taskId}`);
      await axios.delete(`http://localhost:3001/todos/${taskId}`);
      await axios.post('http://localhost:3001/completed', res.data);
      fetchUncompletedTasks();
      fetchCompletedTasks();

      setAlertSeverity('info');
      setAlertMessage('Task marked as completed!');
      setShowAlert(true);
    } catch (error) {
      console.error(`Error marking task with ID ${taskId} as completed:`, error);
    }
  };

  return (
    <main className={styles.main}>
          {showAlert && (
        <AlertComponent
          severity={alertSeverity}
          message={alertMessage}
          onClose={() => setShowAlert(false)}
        />
      )}
      <div className={styles.todo}>
        <h3>Add Task</h3> 
        <div>
          <h5>Description</h5>
          <textarea placeholder="200 words limit"
            type="text"
            name="Title"
            value={formState.Title}
            onChange={(e) => setFormState({ ...formState, Title: e.target.value })}
          />
        </div>
        <div onClick={handleAddClickWrapper}>  <Fab color="primary" aria-label="add"><br/><AddIcon /></Fab></div></div>
      <div className={styles.todo}>
      <h3>{uncompletedTasks.length > 0 ? `Number of Uncompleted Tasks: ${uncompletedTasks.length}` : 'No Task'}</h3>
        <br />
        {uncompletedTasks && uncompletedTasks.map((task,index) => {
          return(
          <div key={task.id} className={styles.Items}>
            <div className={styles.Number}><p>{index+1}</p></div>
            <div className={styles.Content}>
              <p className={styles.Task}> {task.title}</p>
              <p className={styles.Time}>Time: {convertTime(task.id).formattedTime}  Date:{convertTime(task.id).formattedDate}</p>
            </div>
            <div className={styles.buttons}> 
            <div className={styles.button} onClick={() => handleMarkClick(task.id)}> <FontAwesomeIcon icon={faCheck} /></div>
            <div className={styles.button} onClick={() => handleDeleteClickWrapper(task.id, false)}> <FontAwesomeIcon icon={faTrash} /></div>
         </div>
         </div>
          );
          })}
      </div>
      <div className={styles.todo}>
        <h3>Completed Task</h3>
        <br />
        {completedTasks && completedTasks.map((task,index) => (
           <div key={task.id} className={styles.Items}>
           <div className={styles.Number}><p>{index+1}</p></div>
           <div className={styles.Content}>
             <p className={styles.Task}> {task.title}</p>
             <p className={styles.Time}> Time: {convertTime(task.id).formattedTime} &nbsp; &nbsp; Date:{convertTime(task.id).formattedDate}</p>
           </div>
           <div className={styles.buttons}> 
           <div className={styles.button} onClick={() => handleDeleteClickWrapper(task.id, true)}> <FontAwesomeIcon icon={faCircleMinus} /></div>
         </div>
         </div>
        ))}
      </div>
    
    </main>
  );
};


export default Home;

