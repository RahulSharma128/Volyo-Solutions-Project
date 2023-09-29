import React, {  useState } from 'react'
import axios from "axios";

import './FrameCss.css'


export default function Frame (props) {
  const[inputtext,setinputtext]=useState('');
 
    const maxCharacterLimit = 50; // Change this to your desired character limit
  
    const handleChange = (event) => {
      const newValue = event.target.value;
      if (newValue.length <= maxCharacterLimit) {
        setinputtext(newValue);
      }
    };
    
     
    const add_to_storage = () => {
      axios
        .post('http://localhost:8081/user', {
          NotComplete: inputtext,
        })
        .then((response) => {
          console.log("Success", response.data); // Log the response data
        })
        .catch((error) => {
          console.error("Error:", error.response); // Log any errors
        });
    };

  const  click=()=>{
      if(inputtext!==""){
        props.addlist(inputtext);
        add_to_storage();

        setinputtext('');}
        else{
          alert("No item found!!!");
        }
    }

  return (
    <div className='container'>

     <div className='title'>
         TODO-LIST
     </div>
     <div class='div1'>
     <br/>
     
     <div className='center_input'>
        <input type='text' value={inputtext} 
        placeholder={`Max ${maxCharacterLimit} characters`} onChange={
          handleChange
        }></input> 
        <button className='add' onClick={click} >+</button>
        </div>
        <div className="ff"> {maxCharacterLimit - inputtext.length} characters left</div>
        <div className="ff">{inputtext}</div>
      
       



      
     </div>
     


    </div>



    

 

  )
}
