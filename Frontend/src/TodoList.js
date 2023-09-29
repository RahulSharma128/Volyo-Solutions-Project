import React, { useEffect } from 'react'
import "./TodoListCss.css"
import axios from 'axios';



  


function TodoList(props) {
  
  const del=()=>{
   
    const confirmDelete = window.confirm('Are you sure you want to delete this task?');

    if (confirmDelete) {
      axios.delete(`http://localhost:8081/delete/${props.task}`)
        .then((response) => {
          console.log(response.data.message);
          props.deleteItem(props.index);
        })
        .catch((error) => {
          console.error('Error deleting task:', error);
        });
    }


  }

  const moveToCompleted = () => {
    const confirmMove = window.confirm('Are you sure you want to move this task to completed?');

    if (confirmMove) {
      axios.post(`http://localhost:8081/complete/${props.task}`)
        .then((response) => {
          console.log(response.data.message);
          props.check(props.index);
        })
        .catch((error) => {
          console.error('Error moving task to completed:', error);
        });
    }
  };
  
 // (e)=>{props.check(props.index)}

  console.log("props.item:", props.task); 
  return (
   < >
   <div class='conatainer2'>
   <div class='bor'>
    <li class='li'>{props.item} <button class='check' onClick={moveToCompleted}>O</button>
    <button class="delete" onClick={del} >X</button></li>
    
    </div>
    
    </div>
   </>
  )
}

export default TodoList