import query from "./db.js";

export async function GET(request) {
    const url = new URL(request.url);
    const queryParams = url.searchParams.get('completed');

    let values = [];

    if (queryParams !== null) {
        if (queryParams === 'true') {
            values = [1];
        } else if (queryParams === 'false') {
            values = [0];
        }
    }
    const users = await query({
        query: "SELECT * FROM tasks where completed= ?",
        values,
    });

    let data = JSON.stringify(users);
    return new Response(data, {
        status: 200,
    });
}

export async function POST(request) {
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
            message = "success";
        } else {
            message = "error";
        }

        const product = {
            title: title,
        };

        return new Response(JSON.stringify({
            message: message,
            status: 200,
            product: product,
        }));
    } catch (error) {
        return new Response(JSON.stringify({
            status: 500,
            data: request,
        }));
    }
}

export async function DELETE(request) {
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
  