import {verify}  from 'jsonwebtoken';
import { getAllTasks, addTask, updateTask, deleteTask , restoreSoftDeletedRecord} from './db/sequelize.js';
import seedDatabase from './db/seed.js';


function JWTauthentication(request) {
  const authorizationHeader = request.headers.get('authorization');
  if (!authorizationHeader) {
    console.error('Authorization header is missing');
    return new Response('Unauthorized', { status: 401 });
  }

  const tokenParts = authorizationHeader.split(' ');
  if (tokenParts.length !== 2 || tokenParts[0].toLowerCase() !== 'bearer') {
    console.error('Invalid authorization header');
    return new Response('Unauthorized', { status: 401 });
  }

  const token = tokenParts[1];
  const base64EncodedSecret = process.env.secretKey; 
  const secretKey = Buffer.from(base64EncodedSecret, 'base64').toString('utf-8');

  try {
    const decoded = verify(token, secretKey, { algorithms: ['HS256'] });

    return decoded; 
  } catch (error) {
    console.error('Token verification failed:', error.message);
    return new Response('Unauthorized', { status: 401 });
  }
}

export async function GET(request) {


  const authenticationResult = JWTauthentication(request);
  if (authenticationResult.status===401) {
    return authenticationResult;
  }
  const { seed} = authenticationResult;
  console.log(seed);
  try{
  if(seed==="true"){
    const seedRes= await seedDatabase();
    if(seedRes===1) {
      return new Response(JSON.stringify({
        status: 205,
        message: `Successfully seeded task `,
      }), {
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
     // console.log(seedRes);
      return new Response(JSON.stringify({
        status: 500,
        message: `Error seeding `,
      }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

  }
  else {
    const tasks = await getAllTasks(); // using seequlise to get all data

    const data = JSON.stringify(tasks);
    return new Response(data, {
      status: 200,
    });
  }
}catch (error) {
  return new Response(JSON.stringify({
    status: 500,
    message: "Please check the ID",
    data: request,
  }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
}

export async function POST(request) {
  const authenticationResult = JWTauthentication(request);
  console.log(authenticationResult);
  if (authenticationResult.status === 401) {
    return authenticationResult;
  }

  const { id, title, completed, restoreId } = authenticationResult;

  try {
    if (restoreId !== undefined) {
      const restoreResult = await restoreSoftDeletedRecord(restoreId);
     // console.log("log",restoreResult);
      if (restoreResult) {
        return new Response(JSON.stringify({
          status: 205,
          message: `Successfully restored task with ID ${restoreId}`,
        }), {
          headers: { 'Content-Type': 'application/json' },
        });
      } else {
        return new Response(JSON.stringify({
          status: 500,
          message: `Error restoring task with ID ${restoreId}`,
        }), {
          headers: { 'Content-Type': 'application/json' },
        });
      }
    } else {
      const newTaskData = {
        id: id,
        time: new Date(),
        title: title,
        completed: completed,
      };

      const createdTask = await addTask(newTaskData);

      if (createdTask) {
        return new Response(JSON.stringify({
          status: 201,
          message: "Successfully Added Task",
          newTaskData: newTaskData,
        }), {
          headers: { 'Content-Type': 'application/json' },
        });
      } else {
        return new Response(JSON.stringify({
          status: 500,
          message: "Error creating a new task",
        }), {
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }
  } catch (error) {
    return new Response(JSON.stringify({
      status: 500,
      message: "Please check the ID",
      data: request,
    }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function PUT(request) {
  const authenticationResult = JWTauthentication(request);
  //  console.log(authenticationResult);
  if (authenticationResult.status===401) {
    return authenticationResult;
      }
    //console.log(authenticationResult)
    const { taskIdToUpdate, completed } = authenticationResult; 
    const updatedData = {
      title: taskIdToUpdate, 
      completed: completed, 
    };  
    try {
    let updatedTasks = await updateTask(taskIdToUpdate, updatedData);
    console.log(updatedTasks);
    let message = "";
    (updatedTasks="updated")  ? message = `Task with ID ${taskIdToUpdate} was Updated.` : message ="error";
    return new Response(JSON.stringify({
      message: message,
      status: 200,
    }));
    } catch (error) {      
      console.error('Error updating task:', error.message);
      error= error.message;
      return new Response(JSON.stringify({
      status: 204,
      message: error
      }));

    }
 }
  

export async function DELETE(request) {
  const authenticationResult = JWTauthentication(request);
  //  console.log(authenticationResult);
  if (authenticationResult.status===401) {
    return authenticationResult;
      }
    //console.log(authenticationResult)
    let {taskIdToDelete} = authenticationResult;

    try {
      const resultMessage = await deleteTask(taskIdToDelete);
      console.log(resultMessage);
       return new Response(JSON.stringify({
            message: resultMessage,
            TaskId : taskIdToDelete
        }));
    } catch (error) {
      console.error('Error deleting task:', error.message);
      return new Response(JSON.stringify({
      status: 500,
      error : error.message
    }));
    }
}

