import query from "./db.js";
import verify  from 'jsonwebtoken';
import {retrieveAllTasks} from "./db/sequelize.js";


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
    console.log(decoded);

    return null; 
  } catch (error) {
    console.error('Token verification failed:', error.message);
    return new Response('Unauthorized', { status: 401 });
  }
}

export async function GET(request) {
  const authenticationResult = JWTauthentication(request);
  if (authenticationResult !== null) {
    return authenticationResult;
  }

  const tasks = retrieveAllTasks
  const data = JSON.stringify(tasks);
  return new Response(data, {
    status: 200,
  });
}


export async function POST(request) {

  const authenticationResult = JWTauthentication(request);
  if (authenticationResult !== null) {
    return authenticationResult;
  }

    try {
        const newTodo = await request.json(); 
        const { id, title } = newTodo; 
        const updateTasks = await query({
            query: "INSERT INTO tasks (id, title) VALUES (?, ?)",
            values: [id, title],
        });

        const result = updateTasks.affectedRows;
        let message = "";
        if (result) {
            message = "Succesfully Added Task";
        } else {
            message = "error";
        }

        const product = {
            id:id,
            title: title
        };

        return new Response(JSON.stringify({
            message: message,
            status: 201,
            product: product
        }));
    } catch (error) {
        return new Response(JSON.stringify({
            message:"Please check The Id",
            status: 500,
            data: request
        }));
    }
}

export async function DELETE(request) {
  const authenticationResult = JWTauthentication(request);
  if (authenticationResult !== null) {
    return authenticationResult;
  }

    const url = new URL(request.url);
    const taskId = url.searchParams.get('taskId');
    try {
        const deleteUser = await query({
            query: "DELETE FROM tasks WHERE id = ?",
            values: [taskId],
        });
        const result = deleteUser.affectedRows;
        let message = "";
        if (result) {
            message = "success";
        } else {
            message = "error";
        }
        const product = {
            id: taskId,
        };
        return new Response(JSON.stringify({
            message: message,
            status: 200,
            product: product
        }));
    } catch (error) {
        return new Response(JSON.stringify({
            status: 500,
            data: res
        }));
    }
}

export async function PUT(request) {
  const authenticationResult = JWTauthentication(request);
  if (authenticationResult !== null) {
    return authenticationResult;
  }
    const url = new URL(request.url);
    const taskId = url.searchParams.get('taskId');  
    try {
      const updateProducts = await query({
        query: "UPDATE tasks SET completed = 1 WHERE id = ?",
        values: [taskId],
      });
      const result = updateProducts.affectedRows;
      let message = "";
      if (result) {
        message = "success";
      } else {
        message = "error";
      }
      return new Response(JSON.stringify({
        message: message,
        status: 200,
      }));
    } catch (error) {
      return new Response(JSON.stringify({
        status: 500,
        data: error
      }));
    }
  }
  