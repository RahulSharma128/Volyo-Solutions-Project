import React from 'react'
import axios from 'axios'
function TodoListComp(props) {

  const del=()=>{
   
    const confirmDelete = window.confirm('Are you sure you want to delete this completed task?');

    if (confirmDelete) {
      axios.delete(`http://localhost:8081/compdelete/${props.task}`)
        .then((response) => {
          console.log(response.data.message);
          props.deleteItem(props.index);
        })
        .catch((error) => {
          console.error('Error deleting completed task:', error);
        });

      }
  }
  

  return (
    < >
    <div class='conatainer2'>
    <div class="line"></div>
    <div class='bor'>
     <li class='li'>{props.item} 

     {/* <button class='check' onClick={(e)=>{props.check(props.index)}}>O</button> */}
     
     <button class="delete" onClick={del }>X</button></li>
     
     </div>
     
     </div>
    </>
  )
}

export default TodoListComp