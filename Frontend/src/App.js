
import { useEffect, useState } from 'react';
import './App.css';
import Frame from './Frame';
import TodoList from './TodoList';
import TodoListComp from './TodoListComp';
import axios from "axios";






function App() {

  const [list,setlist]=useState([]);
  const[completedlist,newcompletedlist]=useState([]);
  const [NoList, setNoList] = useState([]);
  const [NoCompList, setNoCompList] = useState([]);


  useEffect(() => {
    // Fetch data from the server when the component mounts
    axios.get('http://localhost:8081/user')
      .then((response) => {
        // Assuming the response data is an array of task items
        console.log(response.data);
        setNoList(response.data.data); // Update 'noList' with the array data
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    // Fetch data from the server when the component mounts
    axios.get('http://localhost:8081/complete')
      .then((response) => {
        // Assuming the response data is an array of task items
        console.log(response.data);
        setNoCompList(response.data.data); // Update 'noList' with the array data
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);


  
let addlist=(inputtext)=>{

  setlist([...list,inputtext]);
  }

  const deleteListItem = (index) => {
    let newNoList = [...NoList];
    newNoList.splice(index, 1);
    setNoList(newNoList);
  };

  const deleteCompListItem = (index) => {
    let newNoCompList = [...NoCompList];
    newNoCompList.splice(index, 1);
    setNoCompList(newNoCompList);
  };


  const  check=(task)=>{
    let newlist=[...NoList];
    let x=newlist.splice(task,1);
    setNoList([...newlist]);
 addComp(x);
  }
  let addComp=(x)=>{


    setNoCompList([...NoCompList,x]);
 
  }




  


  return (
    <div ame="App">
      
        
        <Frame  addlist={addlist}/>
      
         <h1>Task Todo</h1>

         {console.log(NoList)}
        

        {NoList.map((listItem,i)=>{
          console.log("listItem:", listItem);
          return(
            <TodoList
      key={i}
      index={i}
      task={listItem.Id}
      item={listItem.NotCompleted} // Make sure this line is correct
      deleteItem={deleteListItem}
      
      check={check}
    />)
        })}
        <h1 id='hh'><u> {NoList.length === 0 ? 'no task to do' : ''}</u></h1>
        
        <h1>Task Completed</h1>
        {NoCompList.map((listItem,i)=>{
          return(
             <TodoListComp  key={i} index={i} item={listItem.Completed} task={listItem.Id} deleteItem={deleteCompListItem} check={check}/>)
        })}
        
        <h1 id='hh'><u> {NoCompList.length === 0 ? 'all task completed' : ''}</u></h1>
    </div>
  );
}

export default App;
