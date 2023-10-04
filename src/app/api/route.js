import query from "./db.js";

function Authorization(request) {
    const apiKey = process.env.API_KEY;
    //console.log(request.headers);
    const authorizationHeader = request.headers.get('api_key');
   //console.log(authorizationHeader);
    return authorizationHeader === apiKey;
}

export async function GET(request) {
    const url = new URL(request.url);
    const queryParams = url.searchParams.get('completed');
  
    if (!Authorization(request)) {
        return new Response('Unauthorized', {
            status: 401,
        });
    }

    let values = [];
    let users = "";

    if (queryParams !== null) {
        if (queryParams === 'true') {
            values = [1];
        } else if (queryParams === 'false') {
            values = [0];
        }
        users = await query({
            query: "SELECT * FROM tasks where completed = ?",
            values,
        });
    } else {
        users = await query({
            query: "SELECT * FROM tasks"
        });
    }

    let data = JSON.stringify(users);
    return new Response(data, {
        status: 200,
    });
}


export async function POST(request) {

    if (!Authorization(request)) {
        return new Response('Unauthorized', {
            status: 401,
        });
    }

    try {
        const newTodo = await request.json(); 
        const { id, title } = newTodo; 
        // Perform the INSERT operation into the 'tasks' table
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
    if (!Authorization(request)) {
        return new Response('Unauthorized', {
            status: 401,
        });
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
    console.log(request.headers);

    if (!Authorization(request)) {
        return new Response('Unauthorized', {
            status: 401,
        });
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
  